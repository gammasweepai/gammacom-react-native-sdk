import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, Appearance } from 'react-native';
import PropTypes from 'prop-types';
import { storeHelper, findColors } from './utils';
import WebView from './WebView';
import styles from './style';

const propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  conversationCookie: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    email: PropTypes.string,
    identifier_hash: PropTypes.string,
  }),
  locale: PropTypes.string,
  colorScheme: PropTypes.oneOf(['dark', 'light', 'auto']),
  customAttributes: PropTypes.shape({}),
  closeModal: PropTypes.func,
};

const GammacomWidget = ({
  isModalVisible,
  baseUrl,
  websiteToken,
  user = {},
  locale = 'en',
  colorScheme = 'light',
  customAttributes = {},
  closeModal,
}) => {
  const [conversationCookie, setCookie] = useState('');

  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value);
    }
    fetchData();
  }, []);
  const appColorScheme = Appearance.getColorScheme();

  const { headerBackgroundColor, mainBackgroundColor } = findColors({
    colorScheme,
    appColorScheme,
  });
  return (
    <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
      <SafeAreaView style={[styles.headerView, { backgroundColor: headerBackgroundColor }]} />
      <SafeAreaView style={[styles.mainView, { backgroundColor: mainBackgroundColor }]}>
        <WebView
          websiteToken={websiteToken}
          conversationCookie={conversationCookie}
          user={user}
          baseUrl={baseUrl}
          locale={locale}
          colorScheme={colorScheme}
          customAttributes={customAttributes}
          closeModal={closeModal}
        />
      </SafeAreaView>
    </Modal>
  );
};

GammacomWidget.propTypes = propTypes;

export default GammacomWidget;
