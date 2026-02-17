// types/three-examples.d.ts
declare module "three/examples/jsm/loaders/SVGLoader" {
  export class SVGLoader {
    load(
      url: string,
      onLoad: (data: any) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent | unknown) => void
    ): void;

    parse(text: string): any;

    // ✅ static helpers used in many SVG workflows
    static createShapes(path: any): any[];
    static pointsToStroke(points: any, style: any, arcDivisions?: number, minDistance?: number): any;
  }
}
