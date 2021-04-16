import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Onyx = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () =>
    data.profile.photo && (
      <img
        className="rounded object-cover mr-4"
        src={data.profile.photo}
        alt="Resume Photograph"
        style={{ width: '120px', height: '120px' }}
      />
    );

  const Profile = () => (
    <div>
      <h1 className="font-bold text-4xl" style={{ color: theme.colors.accent }}>
        {data.profile.firstName} {data.profile.lastName}
      </h1>
      <h6 className="font-medium text-sm">{data.profile.subtitle}</h6>

      <div className="flex flex-col mt-4 text-xs">
        <span>{data.profile.address.line1}</span>
        <span>{data.profile.address.line2}</span>
        <span>{data.profile.address.line3}</span>
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
    <h6 className="text-xs font-bold uppercase mt-6 mb-2" style={{ color: theme.colors.accent }}>
      {title}
    </h6>
  );

  const Objective = () =>
    data.objective &&
    data.objective.enable && (
      <div>
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="text-sm" source={data.objective.body} />
      </div>
    );

  const WorkItem = ({ id, title, role, start, end, description }) => (
    <div key={id} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{title}</h6>
          <p className="text-xs">{role}</p>
        </div>
        <span className="text-xs font-medium">
          ({start} - {end})
        </span>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={description} />
    </div>
  );

  const Work = () =>
    data.work &&
    data.work.enable && (
      <div>
        <Heading title={data.work.heading} />
        {data.work.items.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  const EducationItem = ({ id, name, major, grade, start, end, description }) => (
    <div key={id} className="mt-3">
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
      <ReactMarkdown className="mt-2 text-sm" source={description} />
    </div>
  );

  const Education = () =>
    data.education &&
    data.education.enable && (
      <div>
        <Heading title={data.education.heading} />
        {data.education.items.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const AwardItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="mt-3">
      <h6 className="font-semibold">{title}</h6>
      <p className="text-xs">{subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={description} />
    </div>
  );

  const Awards = () =>
    data.awards &&
    data.awards.enable && (
      <div>
        <Heading title={data.awards.heading} />
        {data.awards.items.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const CertificationItem = ({ id, title, subtitle, description }) => (
    <div key={id} className="mt-3">
      <h6 className="font-semibold">{title}</h6>
      <p className="text-xs">{subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={description} />
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

  const HobbyItem = ({ id, hobby }) => (
    <span
      key={id}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
      }}
    >
      {hobby}
    </span>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div>
        <Heading title={data.hobbies.heading} />
        <div className="mt-1 flex flex-wrap">{data.hobbies.items.map(HobbyItem)}</div>
      </div>
    );

  const SkillItem = ({ id, skill }) => (
    <span
      key={id}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
      }}
    >
      {skill}
    </span>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <div className="mt-1 flex flex-wrap">{data.skills.items.map(SkillItem)}</div>
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
        <div className="w-3/4">{data.languages.items.filter(x => x.enable).map(LanguageItem)}</div>
      </div>
    );

  const ReferenceItem = ({ id, name, position, phone, email, description }) => (
    <div key={id} className="flex flex-col">
      <h6 className="text-sm font-medium">{name}</h6>
      <span className="text-xs">{position}</span>
      <span className="text-xs">{phone}</span>
      <span className="text-xs">{email}</span>
      <ReactMarkdown className="mt-2 text-sm" source={description} />
    </div>
  );

  const References = () =>
    data.references &&
    data.references.enable && (
      <div>
        <Heading title={data.references.heading} />
        <div className="grid grid-cols-3 gap-6">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const ExtraItem = ({ id, key, value }) => (
    <tr key={id}>
      <td className="border font-medium px-4 py-2 text-sm">{key}</td>
      <td className="border px-4 py-2 text-sm">{value}</td>
    </tr>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <table className="table-auto">
          <tbody>{data.extras.items.filter(x => x.enable).map(ExtraItem)}</tbody>
        </table>
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
      <div className="grid grid-cols-4 items-center">
        <div className="col-span-3 flex items-center">
          <Photo />
          <Profile />
        </div>

        <div className="col-span-1 text-xs">
          <ContactItem icon="phone" value={data.profile.phone} link={`tel:${data.profile.phone}`} />
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
      </div>

      <hr className="my-6" />

      <Objective />
      <Work />
      <Education />

      <div className="grid grid-cols-2 gap-6">
        <Awards />
        <Certifications />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Skills />
        <Hobbies />
      </div>

      <References />

      <div className="grid grid-cols-2 gap-6">
        <Extras />
        <Languages />
      </div>
    </div>
  );
};

export default Onyx;
