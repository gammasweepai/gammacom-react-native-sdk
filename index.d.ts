declare module '@gammacom/react-native-widget' {
  import React from 'react';

  export interface GammacomWidgetProps {
    websiteToken: string;
    locale?: string;
    baseUrl: string;
    colorScheme?: 'light' | 'auto' | 'dark';
    closeModal: () => void;
    isModalVisible: boolean;
    user?: {
      identifier?: string;
      name?: string;
      avatar_url?: string;
      email?: string;
      identifier_hash?: string;
    };
    // This can actually be any object
    customAttributes?: Record<string, unknown>;
  }

  class GammacomWidget extends React.Component<GammacomWidgetProps, any> {}
  export default GammacomWidget;
}
