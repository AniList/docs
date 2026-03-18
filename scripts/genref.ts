import * as path from "path";
import * as fs from "fs/promises";
// @ts-ignore Doesn't have type definitions and I'm too lazy to write them
import { loadSchemaJSON, renderSchema } from "graphql-markdown";
import * as _ from "remeda";

type DocumentationPage = {
  section: string;
  type: string;
  content: string;
};

type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
};

const outDir = path.join(process.cwd(), "docs", "reference");

async function main() {
  const schema = await loadSchemaJSON("https://graphql.anilist.co");

  const builtDocumentation: DocumentationPage[] = [];

  let currentSection = "";
  let currentType = "";
  let typeStringBuilder = "";

  renderSchema(schema, {
    title: "AniList API Reference",
    skipTableOfContents: true,
    printer: (line: string) => {
      line = line.trim();
      if (line.startsWith("# ")) {
        return;
      }

      // Get the current section or type
      if (line.startsWith("## ")) {
        // New section
        let newSection = line.replace("## ", "");
        if (newSection.endsWith("s")) {
          newSection = newSection.slice(0, -1);
        }

        currentSection = newSection;
        return;
      } else if (line.startsWith("### ")) {
        // New type
        currentType = line.replace("### ", "");
      }

      typeStringBuilder += line + "\n";

      // If we've reached the end of the table, add it to the documentation and start a new page
      if (line.includes("</table>")) {
        builtDocumentation.push({
          section: currentSection,
          type: currentType,
          content: typeStringBuilder.trim(),
        });
        typeStringBuilder = "";
      }
    },
    typeUrl: (type: { kind: string; name: string }) => {
      return `/reference/${type.kind.toLowerCase()}/${type.name.toLowerCase()}`;
    },
  });

  // Clear out old files
  try {
    await fs.rm(outDir, { recursive: true });
  } catch (_) {
    // Directory doesn't exist yet, or some other error
  }

  await fs.mkdir(outDir, { recursive: true });

  await createSidebar(builtDocumentation);
  await createPages(builtDocumentation);
}

main();

async function createSidebar(documentation: DocumentationPage[]) {
  // Build the sidebar
  let sidebar: SidebarItem[] = _.pipe(
    documentation,
    _.groupBy((page) => page.section),
    _.entries(),
    _.map(([section, types]) => {
      if (isTopLevelType(section)) {
        return {
          text: section,
          link: `/reference/${section.toLowerCase()}`,
        };
      }

      return {
        text: section,
        items: types.map((item) => ({
          text: item.type,
          link: `/reference/${section.toLowerCase()}/${item.type.toLowerCase()}`,
        })),
      };
    }),
  );

  sidebar = [
    {
      text: "API Reference",
      link: "/reference/",
    },
    ...sidebar,
  ];

  await fs.writeFile(
    path.join(outDir, "sidebar.json"),
    JSON.stringify(sidebar, null, 2),
  );
}

async function createPages(documentation: DocumentationPage[]) {
  // Create the index page
  const filePath = path.join(outDir, "index.md");
  fs.mkdir(filePath.split(path.sep).slice(0, -1).join(path.sep), {
    recursive: true,
  });
  const fileContent = `---\ntitle: API Reference\n---\n\n${indexContent}`;
  await fs.writeFile(filePath, fileContent);

  await Promise.all(documentation.map(createPage));
}

async function createPage({ section, type, content }: DocumentationPage) {
  if (isTopLevelType(section)) {
    const outPath = path.join(outDir, `${section.toLowerCase()}.md`);
    await fs.mkdir(outPath.split(path.sep).slice(0, -1).join(path.sep), {
      recursive: true,
    });

    const fileContent = `---\ntitle: ${section} Reference\n---\n\n# Root ${section}\n\n${content}`;

    await fs.writeFile(outPath, fileContent);
    return;
  }

  const outPath = path.join(
    outDir,
    section.toLowerCase(),
    `${type.toLowerCase()}.md`,
  );
  await fs.mkdir(outPath.split(path.sep).slice(0, -1).join(path.sep), {
    recursive: true,
  });

  const fileContent = `---\ntitle: ${type} Reference\n---\n\n${content}`;

  await fs.writeFile(outPath, fileContent);
}

function isTopLevelType(type: string) {
  return type === "Query" || type === "Mutation";
}

const indexContent = `# API Reference

While we recommend using [Apollo Studio](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fgraphql.anilist.co) to explore the API, we also provide these reference pages for quickly finding information.

These pages are manually generated and may not always be up to date.

::: warning
There is a known issue where Scalar types do not get generated. Links for these types will lead to a 404 page.
:::
`;
