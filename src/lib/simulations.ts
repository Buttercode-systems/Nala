export type SimulationOption={id:string;label:string;score:number;feedback:string};
export type SimulationStep={id:string;prompt:string;context?:string;options:SimulationOption[]};
export type Simulation={id:string;title:string;category:string;description:string;skills:string[];passMark:number;steps:SimulationStep[]};

export const SIMULATIONS:Simulation[]=[
 {id:"appointment-confirmation",title:"Appointment confirmation",category:"Customer support",description:"Practise clear, respectful appointment communication and correct escalation.",skills:["Customer communication","Accuracy","Professional judgement"],passMark:75,steps:[
  {id:"opening",prompt:"A customer has not confirmed tomorrow's 10:00 booking. What is the best first message?",options:[
   {id:"a",label:"Hi Naledi, are you still able to attend tomorrow at 10:00? Please reply YES to confirm or let us know if you need to reschedule.",score:25,feedback:"Correct. It is clear, polite and gives the customer an easy next step."},
   {id:"b",label:"Are you coming tomorrow?",score:8,feedback:"Too abrupt and missing the appointment time and rescheduling option."},
   {id:"c",label:"Your appointment will be cancelled if you do not reply now.",score:0,feedback:"This is unnecessarily threatening and may damage the customer relationship."}]},
  {id:"uncertain",prompt:"The customer replies: “I might be late. Can you move me?” What should you do?",options:[
   {id:"a",label:"Promise a new time immediately.",score:4,feedback:"Do not promise availability you cannot verify."},
   {id:"b",label:"Acknowledge the request, record it, and flag it for the owner to confirm the new time.",score:25,feedback:"Correct. You stay helpful without making an unauthorised promise."},
   {id:"c",label:"Ignore the message because it is not a YES or NO.",score:0,feedback:"The request needs to be recorded and escalated."}]},
  {id:"privacy",prompt:"The customer asks for another customer's phone number to swap appointments. What is the safest response?",options:[
   {id:"a",label:"Share the number because both customers use the same salon.",score:0,feedback:"Never share another customer's personal information."},
   {id:"b",label:"Explain that you cannot share customer details and offer to ask the owner about available alternatives.",score:25,feedback:"Correct. This protects privacy and still helps."},
   {id:"c",label:"Send the number but delete the message afterwards.",score:0,feedback:"Deleting the message does not undo a privacy breach."}]},
  {id:"record",prompt:"Three customers confirm, one asks to reschedule and one does not reply. What should your final record contain?",options:[
   {id:"a",label:"Only the three confirmations.",score:8,feedback:"The owner also needs unresolved and rescheduling cases."},
   {id:"b",label:"A complete list showing confirmed, reschedule requested, no response, and any owner action needed.",score:25,feedback:"Correct. A complete, structured record makes the work useful."},
   {id:"c",label:"A message saying “done”.",score:0,feedback:"That does not provide enough evidence or detail."}]}
 ]},
 {id:"quote-follow-up",title:"Quotation follow-up",category:"Sales administration",description:"Practise professional follow-up without pressure or false promises.",skills:["Professional writing","Sales support","Escalation"],passMark:75,steps:[
  {id:"tone",prompt:"A quotation was sent five days ago. Which follow-up is best?",options:[
   {id:"a",label:"Hi Mr Dlamini, I am following up on quotation Q-104. Please let us know if you have any questions or would like us to clarify anything.",score:25,feedback:"Correct. It is specific, professional and helpful."},
   {id:"b",label:"Why have you not accepted our quote?",score:0,feedback:"This sounds confrontational."},
   {id:"c",label:"Last chance before the price doubles.",score:0,feedback:"Never invent urgency or pricing changes."}]},
  {id:"discount",prompt:"The customer asks for a 20% discount. What should you do?",options:[
   {id:"a",label:"Approve it to close the deal.",score:0,feedback:"You do not have authority to change pricing."},
   {id:"b",label:"Record the request and tell the customer the owner will review it.",score:25,feedback:"Correct. You capture the opportunity without overstepping."},
   {id:"c",label:"Say discounts are never allowed.",score:6,feedback:"That may be untrue. Escalate instead."}]},
  {id:"no",prompt:"The customer says they chose another supplier. What is the best response?",options:[
   {id:"a",label:"Thank them for letting you know and record the outcome accurately.",score:25,feedback:"Correct. Stay professional and close the loop."},
   {id:"b",label:"Keep messaging until they reconsider.",score:0,feedback:"That becomes unwanted pressure."},
   {id:"c",label:"Delete them from all records.",score:4,feedback:"The business still needs an accurate outcome record."}]},
  {id:"summary",prompt:"What should the business receive after eight follow-ups?",options:[
   {id:"a",label:"A structured summary of contacted, interested, questions, declined and no-response customers.",score:25,feedback:"Correct. This gives the business actionable visibility."},
   {id:"b",label:"Only screenshots of sent messages.",score:10,feedback:"Screenshots alone are harder to review and do not summarise outcomes."},
   {id:"c",label:"A total message count only.",score:3,feedback:"The business needs customer-level outcomes."}]}
 ]},
 {id:"invoice-reminders",title:"Invoice reminder preparation",category:"Finance administration",description:"Practise accurate, respectful reminders without misrepresenting authority.",skills:["Admin accuracy","Professional communication","Confidentiality"],passMark:75,steps:[
  {id:"verify",prompt:"Before preparing a reminder, what must you verify first?",options:[
   {id:"a",label:"Invoice number, customer, amount, due date and whether payment has already been received.",score:25,feedback:"Correct. Accuracy comes before contact."},
   {id:"b",label:"Only the customer's name.",score:4,feedback:"That is not enough to prevent an incorrect reminder."},
   {id:"c",label:"Nothing; send the same reminder to everyone.",score:0,feedback:"That risks contacting paid or incorrect customers."}]},
  {id:"dispute",prompt:"A customer says the invoice is disputed. What should happen next?",options:[
   {id:"a",label:"Demand payment anyway.",score:0,feedback:"A dispute must be escalated, not chased blindly."},
   {id:"b",label:"Record the dispute details and flag it for the business owner.",score:25,feedback:"Correct. This preserves the issue and stops inappropriate follow-up."},
   {id:"c",label:"Mark the invoice as paid.",score:0,feedback:"A dispute is not a payment."}]},
  {id:"tone",prompt:"Which reminder tone is appropriate?",options:[
   {id:"a",label:"A polite factual reminder that references the invoice and asks the customer to confirm payment status.",score:25,feedback:"Correct. It is clear without being aggressive."},
   {id:"b",label:"Pay today or we will blacklist you.",score:0,feedback:"Do not make threats or legal claims."},
   {id:"c",label:"Hey, you owe us money.",score:2,feedback:"This is too informal and vague."}]},
  {id:"report",prompt:"What should the final handover show?",options:[
   {id:"a",label:"Sent, paid, promised date, disputed, no response and owner action required.",score:25,feedback:"Correct. This creates a useful collections action list."},
   {id:"b",label:"Only who replied.",score:8,feedback:"The business needs the full status of every assigned invoice."},
   {id:"c",label:"Only the total outstanding amount.",score:5,feedback:"That does not explain what happened during the task."}]}
 ]},
 {id:"spreadsheet-cleanup",title:"Spreadsheet cleanup",category:"Data administration",description:"Practise safe, consistent data cleaning and quality control.",skills:["Spreadsheet cleanup","Data accuracy","Quality checking"],passMark:75,steps:[
  {id:"duplicate",prompt:"Two rows have the same phone number but slightly different names. What is the safest action?",options:[
   {id:"a",label:"Delete one immediately.",score:4,feedback:"You need enough evidence before deleting a possible real record."},
   {id:"b",label:"Flag them as possible duplicates and compare other fields before merging or deleting.",score:25,feedback:"Correct. This protects against accidental data loss."},
   {id:"c",label:"Keep both without noting anything.",score:5,feedback:"Potential duplicates should be reviewed and recorded."}]},
  {id:"format",prompt:"Phone numbers use several formats. What should you do?",options:[
   {id:"a",label:"Apply one agreed format consistently while preserving the underlying number.",score:25,feedback:"Correct. Standardisation should not change the data meaning."},
   {id:"b",label:"Remove all country codes.",score:5,feedback:"That may make some numbers unusable."},
   {id:"c",label:"Leave every format unchanged.",score:4,feedback:"The task requires consistent, usable data."}]},
  {id:"missing",prompt:"A required field is blank and you cannot infer the value. What should you do?",options:[
   {id:"a",label:"Guess the most likely value.",score:0,feedback:"Never invent business data."},
   {id:"b",label:"Leave it blank, flag it clearly and include it in the exception summary.",score:25,feedback:"Correct. This keeps the dataset honest."},
   {id:"c",label:"Delete the whole row.",score:2,feedback:"A missing field does not automatically make the full record invalid."}]},
  {id:"quality",prompt:"What final quality check is strongest?",options:[
   {id:"a",label:"Review totals, sample changed rows, confirm formatting rules and provide a change summary.",score:25,feedback:"Correct. This gives confidence that the cleanup is complete."},
   {id:"b",label:"Check only the first row.",score:2,feedback:"One row cannot validate the full file."},
   {id:"c",label:"Rename the file to FINAL.",score:0,feedback:"A filename is not a quality check."}]}
 ]},
 {id:"social-content",title:"Social content preparation",category:"Digital marketing",description:"Practise brand-safe content preparation, accuracy and approval boundaries.",skills:["Content preparation","Brand accuracy","Digital judgement"],passMark:75,steps:[
  {id:"claim",prompt:"The owner asks for a post saying the product is “guaranteed to cure acne,” but no evidence is provided. What should you do?",options:[
   {id:"a",label:"Use the claim because the owner requested it.",score:0,feedback:"Unsupported health claims are unsafe and can harm customers and the business."},
   {id:"b",label:"Flag the claim, avoid publishing it and suggest factual product wording for owner approval.",score:25,feedback:"Correct. You protect the business while staying helpful."},
   {id:"c",label:"Make the claim even stronger for engagement.",score:0,feedback:"Never amplify an unsupported claim."}]},
  {id:"image",prompt:"A customer photo appears in the business folder with no consent note. What is the safest action?",options:[
   {id:"a",label:"Use it because it is already in the folder.",score:0,feedback:"Storage location is not proof of publishing consent."},
   {id:"b",label:"Do not use it until the owner confirms permission.",score:25,feedback:"Correct. Consent must be clear."},
   {id:"c",label:"Crop the face and publish it.",score:5,feedback:"Cropping may not remove identifying details or solve consent."}]},
  {id:"brand",prompt:"Which draft best follows a supplied brand guide?",options:[
   {id:"a",label:"One using the approved tone, spelling, offer details and call to action.",score:25,feedback:"Correct. Brand consistency is part of quality."},
   {id:"b",label:"One with trendy slang that changes the business voice.",score:5,feedback:"Trends should not override the approved brand voice."},
   {id:"c",label:"One that invents a discount to increase clicks.",score:0,feedback:"Never invent an offer."}]},
  {id:"handover",prompt:"What should be included in the final handover?",options:[
   {id:"a",label:"Draft copy, asset references, proposed schedule, approval notes and anything needing owner confirmation.",score:25,feedback:"Correct. This makes review and publishing straightforward."},
   {id:"b",label:"Only a caption pasted into chat.",score:7,feedback:"The owner needs the full prepared package and approval context."},
   {id:"c",label:"Publish everything without review.",score:0,feedback:"Preparation work should respect the agreed approval boundary."}]}
 ]},
 {id:"reception-bookings",title:"Reception and booking support",category:"Reception",description:"Practise handling bookings, uncertainty, boundaries and customer care.",skills:["Reception support","Scheduling","Customer care"],passMark:75,steps:[
  {id:"double",prompt:"Two customers appear booked for the same slot. What should you do?",options:[
   {id:"a",label:"Cancel one at random.",score:0,feedback:"Never make an arbitrary decision affecting a customer."},
   {id:"b",label:"Flag the conflict immediately and ask the owner which booking should be moved.",score:25,feedback:"Correct. You identify the issue without exceeding authority."},
   {id:"c",label:"Leave it and hope one does not arrive.",score:0,feedback:"The conflict must be resolved before service time."}]},
  {id:"late",prompt:"A customer says they will be 25 minutes late. What is the right response?",options:[
   {id:"a",label:"Guarantee they will still be served.",score:3,feedback:"You cannot guarantee this without checking capacity."},
   {id:"b",label:"Acknowledge, record the delay and confirm that the owner will advise whether the booking can still be accommodated.",score:25,feedback:"Correct. This is helpful and accurate."},
   {id:"c",label:"Tell them not to come.",score:0,feedback:"That decision belongs to the business."}]},
  {id:"complaint",prompt:"A frustrated customer complains about a previous service. What should you do first?",options:[
   {id:"a",label:"Argue that the business is not at fault.",score:0,feedback:"Do not become defensive or dismissive."},
   {id:"b",label:"Listen, capture the facts, acknowledge the concern and escalate it to the owner.",score:25,feedback:"Correct. This supports the customer and preserves accurate information."},
   {id:"c",label:"Offer a full refund immediately.",score:4,feedback:"You may not have authority to approve refunds."}]},
  {id:"close",prompt:"At the end of the shift, what should the handover include?",options:[
   {id:"a",label:"Confirmed bookings, changes, no responses, conflicts, complaints and owner actions required.",score:25,feedback:"Correct. A complete handover prevents dropped issues."},
   {id:"b",label:"Only the total number of bookings.",score:6,feedback:"The owner needs details about exceptions and actions."},
   {id:"c",label:"Nothing if the day felt quiet.",score:0,feedback:"A handover should still confirm the status of assigned work."}]}
 ]}
];

export function getSimulationForCategory(category:string){
 const exact=SIMULATIONS.find(s=>s.category.toLowerCase()===category.toLowerCase());
 if(exact)return exact;
 const normalized=category.toLowerCase();
 if(normalized.includes("customer"))return SIMULATIONS[0];
 if(normalized.includes("sales"))return SIMULATIONS[1];
 if(normalized.includes("finance")||normalized.includes("invoice"))return SIMULATIONS[2];
 if(normalized.includes("data")||normalized.includes("spreadsheet"))return SIMULATIONS[3];
 if(normalized.includes("digital")||normalized.includes("marketing")||normalized.includes("social"))return SIMULATIONS[4];
 if(normalized.includes("reception")||normalized.includes("booking"))return SIMULATIONS[5];
 return SIMULATIONS[0];
}
