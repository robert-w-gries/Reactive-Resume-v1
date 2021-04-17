import React from 'react';

import templates from '../../../templates';

const TemplatesTab = ({ theme, onChange }) => (
    <div className="flex flex-col justify-center">
      {templates.map(x => (
        <div key={x.key} className="w-full my-2 text-center" onClick={() => onChange('theme.layout', x.key)}>
          <img
            className={`select-none min-w-full rounded cursor-pointer object-cover border shadow-xl hover:shadow-md ${
              theme.layout.toLowerCase() === x.key
                ? 'border-gray-600 hover:border-gray-600'
                : 'border-transparent '
            } hover:border-gray-500 cursor-pointer`}
            src={x.preview}
            alt={x.name}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      ))}
    </div>
  );

export default TemplatesTab;
