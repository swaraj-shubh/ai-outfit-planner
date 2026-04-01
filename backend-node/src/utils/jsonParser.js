const defaultTemplate = {
  w_top: "",
  w_bottom: "",
  w_footwear: "",
  w_accessories: "",
  u_top: "",
  u_bottom: "",
  u_footwear: "",
  u_accessories: "",
  tip: ""
};

const parseAIJson = (rawText) => {

  try {

    let cleanText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }

    const parsed = JSON.parse(cleanText);

    return parsed;

  } catch {

    const extracted = {};

    const regex = /"([^"]+)"\s*:\s*"([^"]*)"/g;

    let match;

    while ((match = regex.exec(rawText)) !== null) {

      const key = match[1];
      const value = match[2];

      if (key in defaultTemplate) {
        extracted[key] = value;
      }
    }

    return {
      ...defaultTemplate,
      ...extracted
    };
  }
};

export default parseAIJson;