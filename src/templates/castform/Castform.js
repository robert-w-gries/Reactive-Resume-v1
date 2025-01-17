import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Castform = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () =>
    data.profile.photo !== '' && (
      <div className="mt-5 ml-5">
        <img
          className="w-32 h-32 rounded-full"
          style={{
            borderWidth: 6,
            borderColor: theme.colors.background,
          }}
          src={data.profile.photo}
          alt="Profile Photograph"
        />
      </div>
    );

  const PersonalInformation = () => (
    <div className="pt-5 px-5">
      <h1 className="text-2xl font-bold">
        {data.profile.firstName} {data.profile.lastName}
      </h1>
      <h5>{data.profile.subtitle}</h5>
    </div>
  );

  const Heading = ({ title, light = false }) => (
    <div
      className={`py-2 my-4 ${light ? 'mx-5 border-t border-b border-gray-400' : ''}`}
      style={{ backgroundColor: light ? '' : 'rgba(0, 0, 0, 0.25)' }}
    >
      <h6 className={`${light ? '' : 'pl-5'} font-semibold`}>{title}</h6>
    </div>
  );

  const Address = () => (
    <div className="px-5 my-2">
      <h6 className="text-xs font-bold">Address</h6>
      <div className="text-sm">{data.profile.address.line1}</div>
      <div className="text-sm">{data.profile.address.line2}</div>
      <div className="text-sm">{data.profile.address.line3}</div>
    </div>
  );

  const ContactItem = ({ title, value, link = '#' }) =>
    value && (
      <div className="px-5 my-2">
        <h6 className="text-xs font-bold">{title}</h6>
        <a href={link}>
          <div className="text-sm">{value}</div>
        </a>
      </div>
    );

  const ContactInformation = () => (
    <div>
      <Heading title={data.profile.heading} />
      <Address />
      <ContactItem title="Phone" value={data.profile.phone} link={`tel:${data.profile.phone}`} />
      <ContactItem
        title="Email Address"
        value={data.profile.email}
        link={`mailto:${data.profile.email}`}
      />
      <ContactItem
        title="Website"
        value={data.profile.website}
        link={`http://${data.profile.website}`}
      />
    </div>
  );

  const SkillItem = ({ id, skill }) => (
    <li key={id} className="text-sm my-2">
      {skill}
    </li>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <ul className="list-none px-5">{data.skills.items.map(SkillItem)}</ul>
      </div>
    );

  const HobbyItem = ({ id, hobby }) => (
    <li key={id} className="text-sm my-2">
      {hobby}
    </li>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div>
        <Heading title={data.hobbies.heading} />
        <ul className="list-none px-5">{data.hobbies.items.map(HobbyItem)}</ul>
      </div>
    );

  const Objective = () =>
    data.objective && data.objective.enable && (
      <ReactMarkdown className="m-5 text-sm">
        {data.objective.body}
      </ReactMarkdown>
    );

  const WorkItem = ({ id, title, role, start, end, description }) => (
    <div key={id} className="my-3 px-5">
      <div className="flex justify-between">
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
        <Heading light title={data.work.heading} />
        {data.work.items.filter(x => x.enable).map(WorkItem)}
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
        <Heading light title={data.references.heading} />
        <div className="grid grid-cols-2 gap-6 px-5">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const LanguageItem = ({ id, key, level, rating }) => (
    <div key={id} className="flex flex-col my-2">
      <div className="flex justify-between items-center">
        <h6 className="text-sm font-medium mb-1">{key}</h6>
        {level !== '' && <div className="font-bold text-sm">{level}</div>}
      </div>

      {rating !== 0 && (
        <div className="relative h-5">
          <div
            className="absolute mb-1 inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}
          />
          <div
            className="absolute mb-1 inset-0 rounded"
            style={{
              width: `${rating * 20}%`,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );

  const Languages = () =>
    data.languages &&
    data.languages.enable && (
      <div>
        <Heading title={data.languages.heading} />
        <div className="px-5 mb-6">
          {data.languages.items.filter(x => x.enable).map(LanguageItem)}
        </div>
      </div>
    );

  const EducationItem = ({ id, name, major, grade, start, end, description }) => (
    <div key={id} className="my-3 px-5">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{name}</h6>
          <p className="text-xs">{major}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold">{grade}</span>
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
        <Heading light title={data.education.heading} />
        {data.education.items.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const AwardItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="my-3 px-5">
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
        <Heading light title={data.awards.heading} />
        {data.awards.items.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const CertificationItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="my-3 px-5">
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
        {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
      </div>
    );

  const ExtraItem = ({ id, key, value }) => (
    <div key={id} className="px-5 my-2">
      <h6 className="text-xs font-bold">{key}</h6>
      <div className="text-sm">{value}</div>
    </div>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading light title={data.extras.heading} />
        {data.extras.items.filter(x => x.enable).map(ExtraItem)}
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
          className="col-span-4"
          style={{
            color: theme.colors.background,
            backgroundColor: theme.colors.accent,
          }}
        >
          <Photo />
          <PersonalInformation />
          <ContactInformation />
          <Skills />
          <Hobbies />
          <Languages />
          <Certifications />
        </div>
        <div className="col-span-8">
          <Objective />
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

export default Castform;
