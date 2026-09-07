/** Tiny event bus so any component can open the AI assistant panel. */

export const ASSISTANT_OPEN_EVENT = "qd:assistant:open";

export function openAssistant(seed?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<string | undefined>(ASSISTANT_OPEN_EVENT, { detail: seed }),
  );
}
