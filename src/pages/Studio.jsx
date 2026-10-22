import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudioEditor from '../studio/StudioEditor';
import { readProject } from '../projects/projectStore';
import Projects from './Projects';

function Studio() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project, error } = useMemo(() => {
    if (!projectId) return { project: null, error: '' };
    try {
      return { project: readProject(projectId), error: '' };
    } catch (readError) {
      return { project: null, error: readError.message };
    }
  }, [projectId]);

  if (!projectId) return <Projects />;

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f4f8ff] px-6 text-center text-[#172554]">
        <h1 className="text-xl font-bold">Project unavailable</h1>
        <p className="max-w-md text-sm text-slate-600">{error}</p>
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to projects
        </button>
      </main>
    );
  }

  if (!project) return null;

  return (
    <StudioEditor
      key={project.id}
      projectId={project.id}
      projectName={project.name}
      initialElements={project.elements}
      savedProjectElements={project.elements || []}
    />
  );
}

export default Studio;