import Handlebars from "handlebars";

export const renderTemplate = (template: string, payload: any) => {
  const compiled = Handlebars.compile(template);
  return compiled(payload);
};
