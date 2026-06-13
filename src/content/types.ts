export type Exercise =
  | {
      type: 'translate';
      prompt: string;
      answer: string;
      hint?: string;
    }
  | {
      type: 'fill';
      template: string;
      answer: string;
      options: string[];
    }
  | {
      type: 'match';
      pairs: Array<{
        left: string;
        right: string;
      }>;
    };
