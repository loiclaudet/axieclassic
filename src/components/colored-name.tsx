export const ColoredName = ({ name }: { name: string }) => (
  <span dangerouslySetInnerHTML={{ __html: coloredNameToHtmlString(name) }} />
);

function coloredNameToHtmlString(name: string): string {
  const enclosingSpan = "</span>";
  const re = new RegExp("<(color=)?(#(?:[0-9a-fA-F]{3}){1,2})>", "g");
  const count = (name.match(re) ?? []).length;

  return (
    "<span>" +
    name
      // replace hex tags with styled span tags
      .replace(re, `<span style='color:${"$2"};'>`)
      // remove size tags
      .replace(/<(size=)?\d+>/g, "")
      // remove enclosing tags
      .replace(/<\/(color|size)?>/g, "")
      // append enclosing span tags
      .concat(enclosingSpan.repeat(count)) +
    "</span>"
  );
}
