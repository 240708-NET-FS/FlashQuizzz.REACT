import React from "react";
import { createRoot, Root } from "react-dom/client";

class CreateRootEditSingleton {
  private static instance: Root | null = null;
  public static getInstance(): Root {
    if (this.instance == null) {
      this.instance = createRoot(document.getElementById("editForm")!);
    }
    return this.instance!;
  }
}

export default CreateRootEditSingleton;
