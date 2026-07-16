import type {TaskProduct} from "@/lib/market-data";
import {fairPayQuote} from "@/lib/market-operations";

export type PackagingInput={
 requestedOutcome:string;
 businessType:string;
 urgency:"standard"|"urgent";
 containsSensitiveData:boolean;
 customerContactRequired:boolean;
 hourlyFloorCents:number;
};

export type PackagingResult={
 selectedProduct:TaskProduct|null;
 confidence:"high"|"medium"|"low";
 missingInputs:string[];
 safetyFlags:string[];
 scopeSummary:string;
 recommendedWorkerPayCents:number|null;
 publicationReady:boolean;
};

const CATEGORY_TERMS:Record<string,string[]>={
 "Customer support":["appointment","confirm","customer","booking","call","whatsapp"],
 "Sales administration":["quote","quotation","lead","follow up","sales"],
 "Data administration":["spreadsheet","list","data","duplicate","clean","records"],
 "Finance administration preparation":["invoice","overdue","payment reminder","statement"],
 "Digital content support":["caption","social","content","post"],
 "E-commerce catalogue support":["catalogue","catalog","product listing","online store"],
 "Basic technology support":["device","software","setup","technical","tech"],
 "Retail and stock operations":["stock","inventory","count","variance","reorder"],
};

export function packageBusinessNeed(input:PackagingInput,products:TaskProduct[]):PackagingResult{
 const text=`${input.requestedOutcome} ${input.businessType}`.toLowerCase();
 const ranked=products.map(product=>{
  const terms=CATEGORY_TERMS[product.category]||[];
  const score=terms.reduce((total,term)=>total+(text.includes(term)?2:0),0)+product.verticals.reduce((total,vertical)=>total+(text.includes(vertical.replaceAll("_"," "))?1:0),0);
  return {product,score};
 }).sort((a,b)=>b.score-a.score);
 const top=ranked[0];
 const selectedProduct=top?.score>0?top.product:null;
 const missingInputs:string[]=[];
 if(input.requestedOutcome.trim().length<20)missingInputs.push("A clearer description of the completed outcome");
 if(!input.businessType.trim())missingInputs.push("Business type or operating context");
 if(selectedProduct)for(const item of selectedProduct.source_inputs)missingInputs.push(item);
 const safetyFlags:string[]=[];
 const prohibited=/password|bank login|otp|pin|cash collection|medical diagnosis|legal threat|impersonate/i;
 if(prohibited.test(input.requestedOutcome))safetyFlags.push("The request may contain prohibited access, cash, medical, legal or impersonation work.");
 if(input.containsSensitiveData)safetyFlags.push("Sensitive information requires minimisation, approved fields and controlled access.");
 if(input.customerContactRequired)safetyFlags.push("Customer contact must use approved scripts, escalation rules and business-provided contact lists.");
 const quote=selectedProduct?fairPayQuote({activeMinutes:selectedProduct.expected_active_minutes,revisionMinutes:selectedProduct.expected_revision_minutes,hourlyFloorCents:input.hourlyFloorCents,sensitive:input.containsSensitiveData,urgent:input.urgency==="urgent"}):null;
 const recommendedWorkerPayCents=selectedProduct?Math.max(selectedProduct.minimum_worker_pay_cents,quote?.workerPayCents||0):null;
 return {selectedProduct,confidence:!selectedProduct?"low":top.score>=4?"high":"medium",missingInputs:[...new Set(missingInputs)],safetyFlags,scopeSummary:selectedProduct?selectedProduct.outcome:"Nala needs an operator to map this request to an approved task product.",recommendedWorkerPayCents,publicationReady:Boolean(selectedProduct)&&missingInputs.length<=selectedProduct!.source_inputs.length&&safetyFlags.length===0};
}
