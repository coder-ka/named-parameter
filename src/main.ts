type Option = {
  start: string;
  placeholder: (index: number) => string;
};

type Result = {
  sql: string;
  params: any[];
};

export const replace = createReplace({
  start: ":",
  placeholder: () => "?",
});

export function createReplace({
  start,
  placeholder,
}: Option): (sql: string, params?: Record<string, any>) => Result {
  const regexp = new RegExp(`${start}(\\w+)`, "g");

  return (sql: string, params: Record<string, any> = {}) => {
    const array: any[] = [];
    let i = 0;
    const compiled = sql.replace(regexp, (match, p1) => {
      const param = params[p1];

      if (param instanceof Array) {
        param.forEach((p) => array.push(p));

        return `(${param.map(() => "?").join(",")})`;
      } else if (param) {
        array.push(param);

        return placeholder(++i);
      } else {
        return match;
      }
    });

    return {
      sql: compiled,
      params: array,
    };
  };
}
