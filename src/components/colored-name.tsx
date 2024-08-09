type ColoredNameProps = {
  name: string;
  colored?: boolean;
};

export const ColoredName = ({ name, colored }: ColoredNameProps) => {
  const html = coloredNameToHtmlString(name, colored);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

function coloredNameToHtmlString(name: string, colored?: boolean): string {
  const enclosingSpan = "</span>";
  const re = new RegExp("<(color=)?(#(?:[0-9a-fA-F]{3}){1,2})[^>]*>", "g");
  const count = (name.match(re) ?? []).length;

  return (
    name
      // replace hex tags with styled span tags
      .replace(re, colored ? `<span style='color:${"$2"};'>` : "")
      // remove size tags
      .replace(/<(size=)?\d+>/g, "")
      // remove enclosing tags
      .replace(/<\/(color|size)?>/g, "")
      // append enclosing span tags
      .concat(colored ? enclosingSpan.repeat(count) : "")
  );
}
