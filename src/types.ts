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
  matchers: Matchers;
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

interface Matchers {
  Selection: {
    matcher: Matcher;
  }
  Action: {
    matcher: Matcher;
  },
  Input: {
    matcher: Matcher;
  },
}

interface Matcher {
  matcherType: string;
  matcherParameter: {
    _name: string;
    __text: string;
  }
}
