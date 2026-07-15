const {test,expect}=require('@playwright/test');

const cases=[
  {name:'mobile',viewport:{width:360,height:740},maxHeight:28},
  {name:'desktop',viewport:{width:1440,height:900},maxHeight:31},
];

for(const item of cases){
  test(`expanded demo actions stay compact on ${item.name}`,async({page})=>{
    await page.setViewportSize(item.viewport);
    await page.goto('/worker');
    await page.getByRole('button',{name:'Demo controls'}).click();

    const names=['Load worker demo','Reset demo','Clear data'];
    const measurements=[];

    for(const name of names){
      const button=page.getByRole('button',{name});
      await expect(button).toBeVisible();
      const box=await button.boundingBox();
      expect(box,`${name} should have a measurable box`).not.toBeNull();
      measurements.push({name,width:box.width,height:box.height});
      expect(box.height,`${name} is taller than the compact target`).toBeLessThanOrEqual(item.maxHeight);
      expect(box.width,`${name} unexpectedly stretches across the panel`).toBeLessThan(130);
    }

    const triggerBox=await page.getByRole('button',{name:'Demo controls'}).boundingBox();
    expect(triggerBox).not.toBeNull();
    for(const result of measurements){
      expect(result.height).toBeLessThanOrEqual(triggerBox.height);
    }
  });
}