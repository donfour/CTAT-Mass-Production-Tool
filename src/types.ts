export interface Brd {
  stateGraph: {
    edge: Edge[];
  }
}

interface Edge {
  actionLabel: ActionLabel
}

interface ActionLabel {
  uniqueID: string;
  successMessage: string;
  buggyMessage: string;
  hintMessage: string | string[];
  message: Message;
}

interface Message {
  properties: {
    Selection: Property;
    Action: Property;
    Input: Property;
  }
}

interface Property {
  value: string;
}
