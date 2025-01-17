import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Pikachu = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () =>
    data.profile.photo !== '' && (
      <div className="self-center col-span-4">
        <img
          className="w-48 h-48 rounded-full mx-auto object-cover"
          src={data.profile.photo}
          alt=""
        />
      </div>
    );

  const Header = () => (
    <div
      className="h-48 rounded flex flex-col justify-center"
      style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
    >
      <div className="flex flex-col justify-center mx-8 my-6">
        <h1 className="text-3xl font-bold leading-tight">
          {data.profile.firstName} {data.profile.lastName}
        </h1>
        <div className="text-sm font-medium tracking-wide">{data.profile.subtitle}</div>

        <hr className="my-4 opacity-50" />

        <ReactMarkdown className="text-sm">
          {data.objective.body}
        </ReactMarkdown>
      </div>
    </div>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div className="flex items-center my-3">
        <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
          {icon}
        </span>
        <a href={link}>
          <span className="font-medium break-all">{value}</span>
        </a>
      </div>
    );

  const Heading = ({ title }) => (
    <div
      className="mb-2 border-b-2 pb-1 font-bold uppercase tracking-wide text-sm"
      style={{ color: theme.colors.accent, borderColor: theme.colors.accent }}
    >
      {title}
    </div>
  );

  const SkillItem = ({ id, skill }) => (
    <span
      key={id}
      className="leading-none rounded-lg text-sm font-medium bg-gray-300 py-3 my-1 px-4"
    >
      {skill}
    </span>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <div className="flex flex-col mb-6">{data.skills.items.map(SkillItem)}</div>
      </div>
    );

  const HobbyItem = ({ id, hobby }) => (
    <span
      key={id}
      className="leading-none rounded-lg text-sm font-medium bg-gray-300 py-3 my-1 px-4"
    >
      {hobby}
    </span>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div>
        <Heading title={data.hobbies.heading} />
        <div className="flex flex-col mb-6">{data.hobbies.items.map(HobbyItem)}</div>
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
        <div className="grid grid-cols-2 gap-2 mb-6">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
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
      <h6 className="">{value}</h6>
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
      <div>
        <Heading title={data.work.heading} />
        <div className="flex flex-col mb-4">
          {data.work.items.filter(x => x.enable).map(WorkItem)}
        </div>
      </div>
    );

  const EducationItem = ({ id, name, major, grade, start, end, description }) => (
    <div key={id} className="mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">{name}</h6>
          <p className="text-xs">{major}</p>
        </div>
        <div className="flex flex-col text-right items-end">
          <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
            {grade}
          </span>
          <span className="text-xs font-medium">
            ({start} - {end})
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
      <div>
        <Heading title={data.education.heading} />
        <div className="flex flex-col mb-4">
          {data.education.items.filter(x => x.enable).map(EducationItem)}
        </div>
      </div>
    );

  const AwardItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="mb-2">
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
      <div>
        <Heading title={data.awards.heading} />
        <div className="flex flex-col mb-2">
          {data.awards.items.filter(x => x.enable).map(AwardItem)}
        </div>
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
      <div>
        <Heading title={data.certifications.heading} />
        <div className="flex flex-col mb-2">
          {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
        </div>
      </div>
    );

  return (
    <div
      className="p-10"
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <Photo />

        <div className={`${data.profile.photo !== '' ? 'col-span-8' : 'col-span-12'}`}>
          <Header />
        </div>

        <div className="col-span-4 overflow-hidden">
          <div className="text-sm mb-6">
            <ContactItem
              icon="phone"
              value={data.profile.phone}
              link={`tel:${data.profile.phone}`}
            />
            <ContactItem
              icon="language"
              value={data.profile.website}
              link={`http://${data.profile.website}`}
            />
            <ContactItem
              icon="email"
              value={data.profile.email}
              link={`mailto:${data.profile.email}`}
            />
            <ContactItem icon="location_on" value={data.profile.address.line3} />
          </div>

          <Skills />
          <Hobbies />
          <Languages />
          <Certifications />
        </div>

        <div className="col-span-8">
          <Work />
          <Education />
          <Awards />
          <References />
          <Extras />
        </div>
      </div>
    </div>
  );
};

export default Pikachu;
