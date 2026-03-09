import { searchFaq } from "./faqService.js";
import { searchDocuments } from "./documentService.js";
import { generateAIResponse } from "./aiService.js";
import { settings } from "../config/settings.js";

export async function getResponse(question) {
  const faqResult = searchFaq(question);
  if (faqResult) {
    return {
      reply: faqResult.answer,
      source: "faq"
    };
  }

  const docResult = searchDocuments(question);
  if (docResult) {
    if (settings.useAI) {
      const aiReply = await generateAIResponse(question, docResult);
      return {
        reply: aiReply,
        source: "ai+docs"
      };
    }

    return {
      reply: docResult.text,
      source: "docs"
    };
  }

  return {
    reply: "No encontré esa información en las fuentes disponibles. Te recomiendo consultar con coordinación o control escolar.",
    source: "fallback"
  };
}