# profile = {
#     "name": "Arjun Mehta",
#     "age": 22,
#     "gender": "Male",
#     "location": "Bangalore, India",
#     "height": "5'10",
#     "weight": "72kg",
#     "body_type": "Lean Athletic",
#     "skin_tone": "Wheatish",
#     "style_preference": "Minimal, Smart Casual",
#     "budget_range": "Medium",
#     "comfort_fit": "Slim Fit",
#     "profession": "Engineering Student"
# }

# wardrobe = [
#     {
#         "type": "Shirt",
#         "color": "Black",
#         "style": "Formal",
#         "fit": "Slim"
#     },
#     {
#         "type": "Shirt",
#         "color": "White",
#         "style": "Casual",
#         "fit": "Regular"
#     },
#     {
#         "type": "T-Shirt",
#         "color": "Olive Green",
#         "style": "Casual",
#         "fit": "Oversized"
#     },
#     {
#         "type": "Blazer",
#         "color": "Navy Blue",
#         "style": "Formal",
#         "fit": "Slim"
#     },
#     {
#         "type": "Jeans",
#         "color": "Dark Blue",
#         "style": "Casual",
#         "fit": "Slim"
#     },
#     {
#         "type": "Trousers",
#         "color": "Charcoal Grey",
#         "style": "Formal",
#         "fit": "Tailored"
#     },
#     {
#         "type": "Shoes",
#         "color": "White",
#         "style": "Sneakers"
#     },
#     {
#         "type": "Shoes",
#         "color": "Brown",
#         "style": "Loafers"
#     },
#     {
#         "type": "Watch",
#         "color": "Silver",
#         "style": "Minimal"
#     }
# ]


def build_prompt(profile, wardrobe, message):

    return f"""
You are a fashion stylist.

Profile: {profile}
Wardrobe: {wardrobe}
Request: "{message}"

Return ONLY raw JSON.
No markdown.
No explanation.

Format:

{{
  "w_top": "",
  "w_bottom": "",
  "w_footwear": "",
  "w_accessories": "",
  "u_top": "",
  "u_bottom": "",
  "u_footwear": "",
  "u_accessories": "",
  "tip": ""
}}

w_ = wardrobe suggestion (only from wardrobe list)
u_ = ideal suggestion if buying new items
tip = short confidence tip
"""