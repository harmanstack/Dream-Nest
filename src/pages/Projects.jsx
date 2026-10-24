import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownWideNarrow,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  FolderKanban,
  House,
  LayoutGrid,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { createProject, deleteProjects, readProjects } from '../projects/projectStore';
import './Projects.css';

function ProjectPreview({ variant }) {
  return (
    <div className={`project-preview project-preview-${variant % 4}`} aria-hidden="true">
      <div className="preview-plan">
        <div className="preview-room preview-room-main">
          <span className="preview-sofa" />
          <span className="preview-table" />
          <span className="preview-plant" />
        </div>
        <div className="preview-room preview-room-side">
          <span className="preview-bed" />
        </div>
        <span className="preview-door" />
      </div>
    </div>
  );
}

function Projects() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [initialLoad] = useState(() => {
    try {
      return { projects: readProjects(), error: '' };
    } catch (readError) {
      return { projects: [], error: readError.message };
    }
  });

  const [loadedProjects] = useState(initialLoad.projects);
  const [projects, setProjects] = useState(loadedProjects);
  const [error, setError] = useState(initialLoad.error);

  const visibleProjects = useMemo(() => {
    const filteredProjects = projects.filter((project) =>
      project.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
    );

    return [...filteredProjects].sort((first, second) =>
      sortOrder === 'name'
        ? first.name.localeCompare(second.name)
        : new Date(second.updatedAt) - new Date(first.updatedAt)
    );
  }, [projects, query, sortOrder]);

  const handleCreateProject = (event) => {
    event.preventDefault();
    if (!projectName.trim()) return;

    try {
      const project = createProject(projectName);
      setProjects((currentProjects) => [project, ...currentProjects]);
      setProjectName('');
      setIsCreateOpen(false);
      setError('');
    } catch (createError) {
      setError(createError.message || 'The project could not be created.');
    }
  };

  const toggleSelection = (projectId) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(projectId)
        ? currentIds.filter((id) => id !== projectId)
        : [...currentIds, projectId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected project${selectedIds.length === 1 ? '' : 's'}?`)) return;

    try {
      deleteProjects(selectedIds);
      setProjects((currentProjects) => currentProjects.filter((project) => !selectedIds.includes(project.id)));
      setSelectedIds([]);
      setError('');
    } catch (deleteError) {
      setError(deleteError.message || 'The selected projects could not be deleted.');
    }
  };

  const toggleAllVisible = () => {
    const visibleIds = visibleProjects.map((project) => project.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    setSelectedIds((currentIds) =>
      allVisibleSelected
        ? currentIds.filter((id) => !visibleIds.includes(id))
        : [...new Set([...currentIds, ...visibleIds])]
    );
  };

  return (
    <div className="projects-app">
      <aside className="projects-sidebar">
        <button className="projects-brand" onClick={() => navigate('/')} type="button" aria-label="DreamNest home">
          <span className="brand-mark"><House size={19} strokeWidth={2.5} /></span>
          <span>DreamNest</span>
        </button>

        <button className="sidebar-home" onClick={() => navigate('/')} type="button">
          <House size={18} />
          <span>Home</span>
        </button>
        <div className="sidebar-section-label">WORKSPACE</div>
        <button className="sidebar-link sidebar-link-active" type="button" aria-current="page">
          <FolderKanban size={18} />
          <span>Projects</span>
          <span className="sidebar-count">{projects.length}</span>
        </button>
        <button className="sidebar-link" onClick={() => navigate('/studio')} type="button">
          <LayoutGrid size={18} />
          <span>Open studio</span>
        </button>
        
        
        <button
          className="sidebar-link"
          onClick={() => navigate('/templates')}
          type="button"
>
        <House size={18} />
        <span>Floor Plan Templates</span>
        </button>



        <div className="sidebar-tip">
          <div className="sidebar-tip-icon"><FolderKanban size={18} /></div>
          <strong>Your ideas, in one place.</strong>
          <p>Create a project to start a new home layout.</p>
          <button type="button" onClick={() => setIsCreateOpen(true)}>Create a project <Plus size={14} /></button>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">D</div>
          <div><strong>DreamNest user</strong><span>Personal workspace</span></div>
          <ChevronDown size={16} />
        </div>
      </aside>

      <div className="projects-main">
        <header className="projects-topbar">
          <div className="topbar-breadcrumb"><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>Projects</strong></div>
          <div className="topbar-actions">
            <button className="topbar-icon-button" type="button" aria-label="Notifications"><Bell size={18} /></button>
            <div className="topbar-avatar">D</div>
            <button className="create-project-button" type="button" onClick={() => setIsCreateOpen(true)}>
              <Plus size={17} strokeWidth={2.5} /> <span>Create new project</span>
            </button>
          </div>
        </header>

        <main className="projects-content">
          <div className="projects-heading">
            <div>
              <p className="projects-eyebrow">YOUR WORKSPACE</p>
              <h1>Projects <span>{projects.length}</span></h1>
              <p className="projects-subtitle">Every room starts with an idea. Pick up where you left off.</p>
            </div>
            <button className="heading-create-button" type="button" onClick={() => setIsCreateOpen(true)}>
              <Plus size={17} /> New project
            </button>
          </div>

          <section className="project-toolbar" aria-label="Project controls">
            <div className="project-view-label"><LayoutGrid size={17} /><span>All projects</span><ChevronDown size={15} /></div>
            <div className="project-toolbar-right">
              <label className="project-search">
                <Search size={17} />
                <input
                  type="search"
                  placeholder="Search projects"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search projects"
                />
              </label>
              <label className="project-sort">
                <ArrowDownWideNarrow size={16} />
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort projects">
                  <option value="recent">Recently updated</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
          </section>

          {error && <div className="projects-error" role="alert">{error}</div>}

          <section className="project-list-section">
            <div className="project-list-heading">
              <div className="project-list-count">
                <span>{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</span>
                <span className="list-heading-dot" />
                <span>{query ? 'Search results' : 'Your designs'}</span>
              </div>
              <div className="project-list-actions">
                {selectedIds.length > 0 && (
                  <button className="delete-selected-button" type="button" onClick={handleDeleteSelected}>
                    <Trash2 size={15} /> Delete ({selectedIds.length})
                  </button>
                )}
                {visibleProjects.length > 0 && (
                  <button className="select-all-button" type="button" onClick={toggleAllVisible}>
                    <span className={`select-checkbox ${visibleProjects.every((project) => selectedIds.includes(project.id)) ? 'checked' : ''}`}>
                      {visibleProjects.every((project) => selectedIds.includes(project.id)) && <Check size={12} />}
                    </span>
                    Select all
                  </button>
                )}
              </div>
            </div>

            {visibleProjects.length > 0 ? (
              <div className="project-grid">
                <button className="new-project-card" type="button" onClick={() => setIsCreateOpen(true)}>
                  <span className="new-project-plus"><Plus size={23} /></span>
                  <strong>Start a new project</strong>
                  <span>Bring your next room to life</span>
                </button>

                {visibleProjects.map((project, index) => (
                  <article className={`project-card ${selectedIds.includes(project.id) ? 'project-card-selected' : ''}`} key={project.id}>
                    <button
                      type="button"
                      className="project-card-open"
                      onClick={() => navigate(`/studio/${project.id}`)}
                      aria-label={`Open ${project.name}`}
                    >
                      <ProjectPreview variant={index} />
                      <span className="project-card-info">
                        <strong>{project.name}</strong>
                        <span><Clock3 size={13} /> Edited {new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`project-select-control ${selectedIds.includes(project.id) ? 'selected' : ''}`}
                      onClick={() => toggleSelection(project.id)}
                      aria-label={`${selectedIds.includes(project.id) ? 'Deselect' : 'Select'} ${project.name}`}
                      aria-pressed={selectedIds.includes(project.id)}
                    >
                      {selectedIds.includes(project.id) && <Check size={13} />}
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="projects-empty">
                <div className="empty-illustration"><FolderKanban size={28} /></div>
                <h2>{query ? 'No matching projects' : 'Your next great idea starts here'}</h2>
                <p>{query ? 'Try another search term.' : 'Create a project to save a floor plan and come back to it whenever you like.'}</p>
                {!query && <button type="button" className="create-project-button" onClick={() => setIsCreateOpen(true)}><Plus size={17} /> Create your first project</button>}
              </div>
            )}
          </section>
        </main>
      </div>

      {isCreateOpen && (
        <div className="create-project-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsCreateOpen(false);
        }}>
          <section className="create-project-dialog" role="dialog" aria-modal="true" aria-labelledby="create-project-title">
            <button className="dialog-close-button" type="button" onClick={() => setIsCreateOpen(false)} aria-label="Close dialog"><X size={19} /></button>
            <div className="dialog-icon"><FolderKanban size={22} /></div>
            <p className="projects-eyebrow">NEW DESIGN</p>
            <h2 id="create-project-title">Create a project</h2>
            <p className="dialog-description">Give your design a name. You can change it later.</p>
            <form onSubmit={handleCreateProject}>
              <label htmlFor="project-name">Project name</label>
              <input
                id="project-name"
                autoFocus
                maxLength={60}
                placeholder="e.g. My dream living room"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                required
              />
              <div className="dialog-actions">
                <button type="button" className="dialog-cancel-button" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                <button type="submit" className="create-project-button" disabled={!projectName.trim()}><Plus size={16} /> Create project</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default Projects;
