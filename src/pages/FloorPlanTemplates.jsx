
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  House,
  Search,
  Sparkles,
} from "lucide-react";
import {
  createProject,
  saveProjectPlan,
} from "../projects/projectStore";

const templates = [
  {
    id: "studio",
    name: "Studio Apartment",
    category: "Small",
    description: "A smart, open layout for compact living.",
    rooms: "1 open living space",
    elements: [
      ["sofa", 100, 100],
      ["table", 115, 205],
      ["bed", 450, 100],
      ["kitchen", 650, 350],
      ["door", 100, 500],
      ["window", 250, 60],
    ],
  },
  {
    id: "1bhk",
    name: "1 BHK Home",
    category: "Small",
    description: "A cozy home with living, bedroom and kitchen areas.",
    rooms: "1 bedroom",
    elements: [
      ["sofa", 100, 100],
      ["table", 110, 210],
      ["tv", 110, 320],
      ["bed", 450, 100],
      ["wardrobe", 680, 120],
      ["kitchen", 450, 350],
      ["door", 100, 500],
      ["window", 250, 60],
    ],
  },
  {
    id: "2bhk",
    name: "2 BHK Home",
    category: "Family",
    description: "A balanced layout for a small family.",
    rooms: "2 bedrooms",
    elements: [
      ["sofa", 80, 100],
      ["table", 100, 205],
      ["tv", 100, 320],
      ["bed", 400, 90],
      ["wardrobe", 620, 100],
      ["bed", 400, 330],
      ["kitchen", 650, 330],
      ["dining_table", 650, 440],
      ["door", 80, 500],
      ["window", 250, 60],
    ],
  },
  {
    id: "3bhk",
    name: "3 BHK Home",
    category: "Family",
    description: "Extra space for a growing family.",
    rooms: "3 bedrooms",
    elements: [
      ["sofa", 80, 100],
      ["table", 100, 205],
      ["tv", 100, 320],
      ["bed", 370, 80],
      ["wardrobe", 570, 90],
      ["bed", 370, 320],
      ["bed", 650, 80],
      ["kitchen", 650, 320],
      ["dining_table", 650, 430],
      ["door", 80, 500],
      ["window", 250, 60],
    ],
  },
];

const furniture = {
  sofa: {
    name: "Sofa",
    label: "SOFA",
    width: 150,
    height: 80,
    color: "#3b82f6",
    borderColor: "#1d4ed8",
  },
  table: {
    name: "Coffee Table",
    label: "TABLE",
    width: 140,
    height: 70,
    color: "#d97706",
    borderColor: "#b45309",
  },
  tv: {
    name: "TV Unit",
    label: "TV",
    width: 140,
    height: 35,
    color: "#334155",
    borderColor: "#1e293b",
  },
  bed: {
    name: "Bed",
    label: "BED",
    width: 160,
    height: 180,
    color: "#0d9488",
    borderColor: "#0f766e",
  },
  wardrobe: {
    name: "Wardrobe",
    label: "WARDROBE",
    width: 140,
    height: 60,
    color: "#7c3aed",
    borderColor: "#6d28d9",
  },
  kitchen: {
    name: "Kitchen Counter",
    label: "KITCHEN",
    width: 200,
    height: 75,
    color: "#db2777",
    borderColor: "#be185d",
  },
  dining_table: {
    name: "Dining Table",
    label: "DINING TABLE",
    width: 180,
    height: 90,
    color: "#ca8a04",
    borderColor: "#a16207",
  },
  door: {
    name: "Door",
    label: "DOOR",
    width: 100,
    height: 25,
    color: "#ea580c",
    borderColor: "#c2410c",
  },
  window: {
    name: "Window",
    label: "WINDOW",
    width: 120,
    height: 20,
    color: "#0284c7",
    borderColor: "#0369a1",
  },
};

function makeElement(type, index, x, y, templateId) {
  const item = furniture[type];

  return {
    id: `${templateId}-${type}-${index}`,
    type,
    name: item.name,
    label: item.label,
    x,
    y,
    width: item.width,
    height: item.height,
    originalWidth: item.width,
    originalHeight: item.height,
    rotation: 0,
    zIndex: index + 1,
    color: item.color,
    borderColor: item.borderColor,
    textColor: "#ffffff",
  };
}

function TemplatePreview({ template }) {
  return (
    <div className="dn-template-preview">
      <div className="dn-preview-room dn-preview-living">
        <span>Living</span>
        <div className="dn-preview-sofa" />
        <div className="dn-preview-table" />
      </div>
      <div className="dn-preview-room dn-preview-bedroom">
        <span>Bedroom</span>
        <div className="dn-preview-bed" />
      </div>
      <div className="dn-preview-room dn-preview-kitchen">
        <span>Kitchen</span>
      </div>
      <div className="dn-preview-label">
        <House size={13} />
        {template.rooms}
      </div>
    </div>
  );
}

export default function FloorPlanTemplates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [projectName, setProjectName] = useState("");
  const [selectedId, setSelectedId] = useState("1bhk");

  const categories = ["All", "Small", "Family"];

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory =
        category === "All" || template.category === category;

      const matchesSearch = template.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  function useTemplate(template) {
    try {
      const name =
        projectName.trim() || `${template.name} Design`;

      const project = createProject(name);

      const elements = template.elements.map(
        ([type, x, y], index) =>
          makeElement(type, index, x, y, template.id)
      );

      saveProjectPlan(project.id, elements);
      navigate(`/studio/${project.id}`);
    } catch (error) {
      window.alert(
        error.message || "Could not create the floor plan."
      );
    }
  }

  return (
    <div className="dn-templates-page">
      <style>{`
        .dn-templates-page {
          min-height: 100vh;
          padding: 32px;
          background: #f4f8ff;
          color: #17243b;
          font-family: inherit;
        }
        .dn-template-top, .dn-template-toolbar, .dn-template-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .dn-template-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          color: #3478f6;
          cursor: pointer;
          font-weight: 600;
        }
        .dn-template-heading { margin: 30px 0 24px; }
        .dn-template-heading h1 {
          margin: 8px 0;
          font-size: clamp(28px, 4vw, 40px);
        }
        .dn-template-heading p { color: #778399; }
        .dn-template-eyebrow {
          color: #3478f6;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }
        .dn-template-toolbar { flex-wrap: wrap; margin-bottom: 22px; }
        .dn-template-search {
          display: flex;
          align-items: center;
          gap: 10px;
          width: min(100%, 340px);
          padding: 12px 14px;
          border: 1px solid #dce5f2;
          border-radius: 12px;
          background: white;
        }
        .dn-template-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font: inherit;
        }
        .dn-template-categories { display: flex; flex-wrap: wrap; gap: 8px; }
        .dn-template-categories button {
          padding: 10px 16px;
          border: 1px solid #dce5f2;
          border-radius: 20px;
          background: white;
          color: #526078;
          cursor: pointer;
        }
        .dn-template-categories button.category-active {
          border-color: #3478f6;
          background: #3478f6;
          color: white;
        }
        .dn-template-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }
        .dn-template-card {
          overflow: hidden;
          border: 1px solid #e0e8f4;
          border-radius: 18px;
          background: white;
          box-shadow: 0 5px 20px #233b5b0a;
        }
        .dn-template-card.selected { border: 2px solid #3478f6; }
        .dn-template-preview {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 0.55fr;
          gap: 5px;
          height: 190px;
          padding: 16px;
          background: #eaf1fb;
        }
        .dn-preview-room {
          position: relative;
          display: flex;
          align-items: flex-start;
          padding: 8px;
          border: 2px solid #a9bdd9;
          background: #fff;
          color: #778399;
          font-size: 10px;
          font-weight: 700;
        }
        .dn-preview-living { grid-row: span 2; }
        .dn-preview-sofa {
          position: absolute; left: 14px; bottom: 34px;
          width: 52px; height: 22px; border-radius: 5px;
          background: #3478f6;
        }
        .dn-preview-table {
          position: absolute; left: 28px; bottom: 12px;
          width: 30px; height: 15px; border-radius: 3px;
          background: #d97706;
        }
        .dn-preview-bed {
          position: absolute; right: 12px; bottom: 12px;
          width: 38px; height: 43px; border-radius: 5px;
          background: #0d9488;
        }
        .dn-preview-label {
          position: absolute; right: 16px; bottom: 12px;
          display: flex; align-items: center; gap: 5px;
          padding: 6px 9px; border-radius: 20px;
          background: white; color: #526078; font-size: 11px;
        }
        .dn-template-card-body { padding: 18px; }
        .dn-template-card h2 { margin: 0 0 8px; font-size: 20px; }
        .dn-template-card p { margin: 0 0 16px; color: #778399; line-height: 1.5; }
        .dn-template-actions { justify-content: flex-start; flex-wrap: wrap; }
        .dn-template-select, .dn-template-use {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 10px 14px; border-radius: 10px;
          cursor: pointer; font: inherit; font-weight: 700;
        }
        .dn-template-select {
          border: 1px solid #dce5f2; background: white; color: #3478f6;
        }
        .dn-template-use {
          border: 1px solid #3478f6; background: #3478f6; color: white;
        }
        .dn-template-create {
          display: flex; align-items: center; gap: 12px;
          flex-wrap: wrap; margin-top: 24px; padding: 18px;
          border: 1px solid #dce5f2; border-radius: 16px; background: white;
        }
        .dn-template-create input {
          flex: 1; min-width: 180px; padding: 12px;
          border: 1px solid #dce5f2; border-radius: 10px; font: inherit;
        }
        .dn-template-empty {
          grid-column: 1 / -1; padding: 32px; text-align: center;
          color: #778399; background: white; border-radius: 16px;
        }
        @media (max-width: 700px) {
          .dn-templates-page { padding: 20px 14px; }
          .dn-template-grid { grid-template-columns: 1fr; }
          .dn-template-top { align-items: flex-start; }
        }
      `}</style>

      <div className="dn-template-top">
        <button
          className="dn-template-back"
          onClick={() => navigate("/projects")}
          type="button"
        >
          <ArrowLeft size={18} /> Back to Projects
        </button>
        <strong style={{ color: "#3478f6" }}>
          <House size={18} style={{ verticalAlign: "middle" }} /> DreamNest
        </strong>
      </div>

      <header className="dn-template-heading">
        <div className="dn-template-eyebrow">
          <Sparkles size={14} style={{ verticalAlign: "middle" }} /> START WITH A TEMPLATE
        </div>
        <h1>Find your perfect floor plan</h1>
        <p>Choose a layout, create your project, and customize it in the studio.</p>
      </header>

      <div className="dn-template-toolbar">
        <label className="dn-template-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search floor plans..."
          />
        </label>

        <div className="dn-template-categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category-active" : ""}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="dn-template-grid">
        {filteredTemplates.map((template) => (
          <article
            key={template.id}
            className={`dn-template-card ${
              selectedId === template.id ? "selected" : ""
            }`}
          >
            <TemplatePreview template={template} />

            <div className="dn-template-card-body">
              <h2>{template.name}</h2>
              <p>{template.description}</p>

              <div className="dn-template-actions">
                <button
                  type="button"
                  className="dn-template-select"
                  onClick={() => setSelectedId(template.id)}
                >
                  {selectedId === template.id && <Check size={16} />}
                  {selectedId === template.id ? "Selected" : "Select layout"}
                </button>

                <button
                  type="button"
                  className="dn-template-use"
                  onClick={() => useTemplate(template)}
                >
                  Use template
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="dn-template-empty">
            No templates found. Try another search.
          </div>
        )}
      </section>

      <form
        className="dn-template-create"
        onSubmit={(event) => {
          event.preventDefault();
          const template = templates.find((item) => item.id === selectedId);
          if (template) useTemplate(template);
        }}
      >
        <div>
          <strong>Name your design</strong>
          <div style={{ color: "#778399", fontSize: 13, marginTop: 4 }}>
            Optional — otherwise the template name will be used.
          </div>
        </div>

        <input
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder="e.g. My Dream Home"
          aria-label="Project name"
        />

        <button className="dn-template-use" type="submit">
          Create selected plan
        </button>
      </form>
    </div>
  );
}
