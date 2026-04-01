const buildPrompt = (profile, wardrobe, message) => {

  return `
You are a fashion stylist.

Profile: ${JSON.stringify(profile)}
Wardrobe: ${JSON.stringify(wardrobe)}
Request: "${message}"

Return ONLY raw JSON.
No markdown.
No explanation.

Format:

{
  "w_top": "",
  "w_bottom": "",
  "w_footwear": "",
  "w_accessories": "",
  "u_top": "",
  "u_bottom": "",
  "u_footwear": "",
  "u_accessories": "",
  "tip": ""
}

w_ = wardrobe suggestion (only from wardrobe list)
u_ = ideal suggestion if buying new items
tip = short confidence tip
`;
};

export default buildPrompt;