import fs from "fs";
import path from "path";

const faqPath = path.join(process.cwd(), "data", "faq.json");
const faqData = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

export function searchFaq(question) {
  const q = question.toLowerCase();

  for (const item of faqData) {
    const match = item.keywords.some(keyword => q.includes(keyword.toLowerCase()));
    if (match) {
      return item;
    }
  }

  return null;
}