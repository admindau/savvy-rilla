// app/studios/[slug]/page.tsx
import { notFound } from 'next/navigation';

type StudioSlug =
  | 'gorilla-ledger'
  | 'our-matriline'
  | 'war-towards-purpose'
  | 'roots-family-tree'
  | 'humanitarian-support'
  | 'savvy-rilla-labs';

const projects: Record<
  StudioSlug,
  {
    title: string;
    tag: string;
    intro: string;
    body: string[];
  }
> = {
  'gorilla-ledger': {
    title: 'Gorilla Ledger™',
    tag: 'Fintech · Product',
    intro:
      'Gorilla Ledger™ is a modern personal finance tracker being built under the Savvy Gorilla ecosystem for Africans who want clarity on money without wrestling with spreadsheets.',
    body: [
      'The product is designed for irregular income, side hustles, and multi-currency realities — situations where traditional budgeting apps and templates quickly fall apart.',
      'Gorilla Ledger focuses on clean interfaces, fast workflows, and a structure that respects how families and communities actually move money in and out of shared responsibilities.',
      'Technically, it is powered by Next.js, Supabase, and Vercel, with a focus on performance, security, and a clear separation between core infrastructure and user experience.',
    ],
  },
  'our-matriline': {
    title: 'Our Matriline Podcast',
    tag: 'Podcast · Women · Legacy',
    intro:
      'Our Matriline Podcast is a women-led storytelling platform documenting journeys from girlhood to womanhood, the politics of dowry, and the everyday labour of love and care.',
    body: [
      'The podcast holds space for conversations about inter-tribal relationships, cross-cultural marriages, and what it means to honour the women who built and held families together.',
      'Savvy Gorilla supports the visual identity, digital presence, and technical workflows — from episode structure and artwork templates to publishing routines.',
      'Our Matriline doubles as both a creative outlet and an archive, preserving stories that may otherwise stay inside private rooms and family gatherings.',
    ],
  },
  'war-towards-purpose': {
    title: 'War Towards Purpose',
    tag: 'Docu-series · Memory',
    intro:
      'War Towards Purpose is a docu-series that archives the lived experiences of leaders, soldiers, spouses, and families who carried the burden of liberation and nation-building.',
    body: [
      'The project is built around long-form, intimate conversations that go beyond battlefield moments — touching on faith, trauma, healing, and what it means to build a life after conflict.',
      'It is produced by Savvy Gorilla Studios in collaboration with Motherland Entertainment, combining narrative structure, visual direction, and technical production.',
      'War Towards Purpose aims to become a reference archive for future generations who inherit countries but rarely hear full stories of those who fought for them.',
    ],
  },
  'roots-family-tree': {
    title: 'Roots Family Tree',
    tag: 'Storylab · Family',
    intro:
      'Roots Family Tree is a storytelling and design lab exploring how families can map their histories, lineages, and memories in ways that feel both modern and deeply local.',
    body: [
      'The project experiments with visual tree designs, cattle camp scenes, and silhouettes alongside light digital tools that help relatives make sense of who is who across generations.',
      'It is particularly interested in how migration, displacement, and urbanisation have reshaped how families stay connected to their roots.',
      'Roots is still in an exploratory phase, serving as a sandbox for formats, templates, and platforms that may later be refined into a product.',
    ],
  },
  'humanitarian-support': {
    title: 'humanitarian & humanitarian support',
    tag: 'Tech & Comms · Partners',
    intro:
      'Savvy Gorilla provides strategic communication and light tech thinking in support of mine action and protection efforts, particularly alongside humanitarian in South Sudan.',
    body: [
      'This work includes visibility and advocacy materials, social media content, donor-facing reports, and concept notes that capture the scale and nuance of mine action operations.',
      'We focus on making complex, technical work legible to multiple audiences — from affected communities and national authorities to international donors and partner agencies.',
      'Where relevant, we also explore digital and data-backed tools that can improve how stories, statistics, and operational realities are communicated.',
    ],
  },
  'savvy-rilla-labs': {
    title: 'Savvy Rilla Labs & podcast',
    tag: 'Studio · Experiments',
    intro:
      'Savvy Rilla Labs is the experimental wing of Savvy Gorilla — home to the Savvy Rilla podcast, football banter, tech talk, and formats that test what might become full products later.',
    body: [
      'It is intentionally playful, giving space to try out episode structures, visual motifs, and workflows without the pressure of a formal client or product brief.',
      'Some experiments live and die in the lab; others graduate into more serious projects under the wider Savvy Gorilla ecosystem.',
      'The lab keeps the studio curious, connected to culture, and honest about what actually resonates with audiences beyond theory.',
    ],
  },
};

export function generateStaticParams() {
  const slugs: StudioSlug[] = [
    'gorilla-ledger',
    'our-matriline',
    'war-towards-purpose',
    'roots-family-tree',
    'humanitarian-support',
    'savvy-rilla-labs',
  ];
  return slugs.map((slug) => ({ slug }));
}

export default function StudioDetailPage({
  params,
}: {
  params: { slug: StudioSlug };
}) {
  const studio = projects[params.slug];

  if (!studio) {
    notFound();
  }

  return (
    <div className="twocol">
      <div>
        <p className="page-eyebrow">{studio.tag}</p>
        <h1 className="page-title">{studio.title}</h1>
        <p className="page-subtitle">{studio.intro}</p>

        <section className="section">
          {studio.body.map((paragraph, index) => (
            <p key={index} className="section-text" style={{ marginBottom: '0.75rem' }}>
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      <aside className="twocol-aside">
        <p>
          <strong>Where this sits in the ecosystem</strong>
        </p>
        <p>
          Each studio or project is part of a larger story about African ideas
          finding modern homes — in code, on camera, and on record. Together,
          they show the range of what Savvy Gorilla is interested in building.
        </p>
        <p>
          If you see overlaps with your own work and would like to collaborate,
          you can reach out through the contact page and reference this specific
          studio in your message.
        </p>
      </aside>
    </div>
  );
}
