import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const Gengar = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const { r, g, b } = hexToRgb(theme.colors.accent) || {};

  const Photo = () =>
    data.profile.photo !== '' && (
      <img
        className="w-24 h-24 rounded-full mr-4 object-cover border-4"
        style={{
          borderColor: theme.colors.background,
        }}
        src={data.profile.photo}
        alt="Resume Photograph"
      />
    );

  const FullName = () => (
    <div>
      <h1 className="text-2xl font-bold leading-tight">{data.profile.firstName}</h1>
      <h1 className="text-2xl font-bold leading-tight">{data.profile.lastName}</h1>
      <div className="text-xs font-medium mt-2">{data.profile.subtitle}</div>
    </div>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div className="flex items-center mb-3">
        <div
          className="w-5 h-5 rounded-full flex justify-center items-center mr-2"
          style={{ backgroundColor: theme.colors.background }}
        >
          <i
            className="flex justify-center items-center material-icons text-xs"
            style={{ color: theme.colors.accent }}
          >
            {icon}
          </i>
        </div>
        <a href={link}>
          <span className="text-sm font-medium break-all">{value}</span>
        </a>
      </div>
    );

  const Heading = ({ title }) => (
    <h6 className="font-bold text-xs uppercase tracking-wide mb-2">{title}</h6>
  );

  const Objective = () =>
    data.objective &&
    data.objective.enable && (
      <div className="flex flex-col justify-center items-start mb-6">
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="text-sm">
          {data.objective.body}
        </ReactMarkdown>
      </div>
    );

  const SkillItem = ({ id, skill }) => (
    <li key={id} className="text-sm py-1">
      {skill}
    </li>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div className="mb-6">
        <Heading title={data.skills.heading} />
        <ul>{data.skills.items.map(SkillItem)}</ul>
      </div>
    );

  const HobbyItem = ({ id, hobby }) => (
    <li key={id} className="text-sm py-1">
      {hobby}
    </li>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div className="mb-6">
        <Heading title={data.hobbies.heading} />
        <ul>{data.hobbies.items.map(HobbyItem)}</ul>
      </div>
    );

  const EducationItem = ({ id, name, start, end, major, grade, description }) => (
    <div key={id} className="mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">
            {name}
            <small className="ml-2">
              {start !== '' && end !== '' && (
                <span className="text-xs font-medium">
                  ({start} - {end})
                </span>
              )}
            </small>
          </h6>
          <p className="text-xs">{major}</p>
        </div>
        <div className="flex flex-col text-right items-end">
          <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
            {grade}
          </span>
        </div>
      </div>
      <ReactMarkdown className="mt-2 text-sm">
        {description}
      </ReactMarkdown>
    </div>
  );

  const Education = () =>
    data.education &&
    data.education.enable && (
      <div className="mb-6">
        <Heading title={data.education.heading} />
        {data.education.items.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const CertificationItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="mb-3">
      <h6 className="font-semibold">{title}</h6>
      <p className="text-xs">{subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm">
        {description}
      </ReactMarkdown>
    </div>
  );

  const Certifications = () =>
    data.certifications &&
    data.certifications.enable && (
      <div className="mb-6">
        <Heading title={data.certifications.heading} />
        {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
      </div>
    );

  const AwardItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="mb-3">
      <h6 className="font-semibold">{title}</h6>
      <p className="text-xs">{subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm">
        {description}
      </ReactMarkdown>
    </div>
  );

  const Awards = () =>
    data.awards &&
    data.awards.enable && (
      <div className="mb-6">
        <Heading title={data.awards.heading} />
        {data.awards.items.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const ReferenceItem = ({ id, name, position, phone, email, description }) => (
    <div key={id} className="flex flex-col">
      <h6 className="text-sm font-medium">{name}</h6>
      <span className="text-xs">{position}</span>
      <span className="text-xs">{phone}</span>
      <span className="text-xs">{email}</span>
      <ReactMarkdown className="mt-2 text-sm">
        {description}
      </ReactMarkdown>
    </div>
  );

  const References = () =>
    data.references &&
    data.references.enable && (
      <div>
        <Heading title={data.references.heading} />
        <div className="grid grid-cols-2 gap-6">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const WorkItem = ({ id, title, role, start, end, description }) => (
    <div key={id} className="mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">{title}</h6>
          <p className="text-xs">{role}</p>
        </div>
        <span className="text-xs font-medium">
          ({start} - {end})
        </span>
      </div>
      <ReactMarkdown className="mt-2 text-sm">
        {description}
      </ReactMarkdown>
    </div>
  );

  const Work = () =>
    data.work &&
    data.work.enable && (
      <div className="mb-6">
        <Heading title={data.work.heading} />
        {data.work.items.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  const LanguageItem = ({ id, key, level, rating }) => (
    <div key={id} className="grid grid-cols-2 items-center py-2">
      <h6 className="text-sm font-medium">{key}</h6>
      <div className="flex">
        {level && <div className="font-bold text-sm mr-2">{level}</div>}
        {rating !== 0 && (
          <div className="flex">
            {Array.from(Array(rating)).map((_, i) => (
              <i key={i} className="material-icons text-lg" style={{ color: theme.colors.accent }}>
                star
              </i>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const Languages = () =>
    data.languages &&
    data.languages.enable && (
      <div>
        <Heading title={data.languages.heading} />
        <div className="mb-6">{data.languages.items.filter(x => x.enable).map(LanguageItem)}</div>
      </div>
    );

  const ExtraItem = ({ id, key, value }) => (
    <div key={id} className="text-sm my-1">
      <h6 className="text-xs font-bold">{key}</h6>
      <h6>{value}</h6>
    </div>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <div className="grid grid-cols-2">
          {data.extras.items.filter(x => x.enable).map(ExtraItem)}
        </div>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12">
        <div
          className="col-span-4 px-6 py-8"
          style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
        >
          <div className="flex items-center">
            <Photo />
            <FullName />
          </div>

          <hr className="w-1/4 my-5 opacity-50" />

          <ContactItem icon="phone" value={data.profile.phone} link={`tel:${data.profile.phone}`} />
          <ContactItem
            icon="email"
            value={data.profile.email}
            link={`mailto:${data.profile.email}`}
          />
          <ContactItem
            icon="language"
            value={data.profile.website}
            link={`http://${data.profile.website}`}
          />
          <ContactItem icon="location_on" value={data.profile.address.line3} />
        </div>

        <div
          className="col-span-8 px-6 py-8"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Objective />
          <Extras />
        </div>

        <div
          className="col-span-4 px-6 py-8"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Skills />
          <Hobbies />
          <Languages />
          <Education />
          <Certifications />
        </div>

        <div className="col-span-8 px-6 py-8">
          <Work />
          <Awards />
          <References />
        </div>
      </div>
    </div>
  );
};

export default Gengar;
