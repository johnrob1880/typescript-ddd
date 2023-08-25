import { Result } from "../logic";

type ParseDataType = "number" | "string" | "object";

class ParseArrayConfig {
  private raw: any;

  constructor(raw: any) {
    this.raw = raw;
  }

  public to(dataType: ParseDataType): any[] {
    switch (dataType) {
      case "number":
        return JSON.parse(this.raw) as number[];
      case "string":
        return JSON.parse(this.raw) as string[];
      case "object":
        return JSON.parse(this.raw) as object[];
    }
  }
}

export class ParseUtils {
  public static parseBoolean(raw: any): boolean {
    if (raw === "" || raw === undefined || raw === null || raw === "null")
      return false;
    return JSON.parse(raw);
  }
  public static parseObject<T extends object = {}>(raw: any): Result<T> {
    let returnData: T;
    try {
      returnData = JSON.parse(raw);
    } catch (err) {
      return Result.fail(err);
    }
    return Result.ok<T>(returnData);
  }
  public static parseArray(rawStringArray: any): ParseArrayConfig {
    return new ParseArrayConfig(rawStringArray);
  }
}
