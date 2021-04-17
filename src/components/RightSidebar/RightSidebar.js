import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import TemplatesTab from './tabs/Templates';
import ColorsTab from './tabs/Colors';
import FontsTab from './tabs/Fonts';
import ActionsTab from './tabs/Actions';
import AboutTab from './tabs/About';
import SettingsTab from './tabs/Settings';
import DraggableModal from '../modals/DraggableModal';

const RightSidebar = () => {
  const { t } = useTranslation('rightSidebar');

  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data, theme, settings } = state;

  const tabs = [
    {
      key: 'templates',
      name: t('templates.title'),
    },
    {
      key: 'colors',
      name: t('colors.title'),
    },
    {
      key: 'fonts',
      name: t('fonts.title'),
    },
    {
      key: 'actions',
      name: t('actions.title'),
    },
    {
      key: 'settings',
      name: t('settings.title'),
    },
    {
      key: 'about',
      name: t('about.title'),
    },
  ];
  const [currentTab, setCurrentTab] = useState('');

  const onChange = (key, value) => {
    dispatch({
      type: 'on_input',
      payload: {
        key,
        value,
      },
    });

    dispatch({ type: 'save_data' });
  };

  const handleClick = (tabKey) => {
    setCurrentTab(tabKey !== currentTab ? tabKey : '');
  };

  const renderTabs = () => {
    switch (currentTab) {
      case tabs[0].key:
        return <TemplatesTab theme={theme} onChange={onChange} />;
      case tabs[1].key:
        return <ColorsTab theme={theme} onChange={onChange} />;
      case tabs[2].key:
        return <FontsTab theme={theme} onChange={onChange} />;
      case tabs[3].key:
        return <ActionsTab data={data} theme={theme} dispatch={dispatch} />;
      case tabs[4].key:
        return <SettingsTab settings={settings} onChange={onChange} />;
      case tabs[5].key:
        return <AboutTab />;
      default:
        return null;
    }
  };

  return (
    <div
      id="rightSidebar"
      className="fixed p-2 left-0 w-36 h-full z-10 bg-white shadow-xl overflow-y-scroll"
    >
      <TabBar tabs={tabs} selectedTab={currentTab} onSelect={handleClick} />
      <DraggableModal isOpen={Boolean(currentTab)} onClose={() => setCurrentTab('')} ariaLabel="Modal">
        {renderTabs()}
      </DraggableModal>
    </div>
  );
};

export default RightSidebar;
