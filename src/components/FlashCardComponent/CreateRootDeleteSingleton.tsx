import React from "react";
import { createRoot, Root } from "react-dom/client";

class CreateRootDeleteSingleton {
  private static instance: Root | null = null;
  public static getInstance(): Root {
    if (this.instance == null) {
      this.instance = createRoot(document.getElementById("deleteConfirm")!);
    }
    return this.instance!;
  }
}

export default CreateRootDeleteSingleton;
