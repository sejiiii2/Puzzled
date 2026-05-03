import { useState } from 'react';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import AnalyzingScreen from './pages/AnalyzingScreen';
import ProjectBreakdown from './pages/ProjectBreakdown';
import PuzzleBoard from './pages/PuzzleBoard';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import { PROJECTS } from './data/projects';
import './index.css';

export default function App() {
  const [page, setPage] = useState('landing');
  const [projects, setProjects] = useState(PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const [pendingProject, setPendingProject] = useState(null);
  const [savedToolIds, setSavedToolIds] = useState([]);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const handleProjectUpdate = (updatedProject) => {
    setProjects(prev =>
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const handleOnboardingComplete = (newProject) => {
    setPendingProject(newProject);
    setPage('analyzing');
  };

  const handleAnalyzingDone = () => {
    setPage('breakdown');
  };

  const handleBreakdownConfirm = (finalProject) => {
    setProjects(prev => [...prev, finalProject]);
    setActiveProjectId(finalProject.id);
    setPendingProject(null);
    setPage('board');
  };

  const handleSaveTool = (toolId) => {
    setSavedToolIds(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
  };

  const hideNav = ['landing', 'onboarding', 'analyzing', 'breakdown'].includes(page);

  return (
    <div className="min-h-screen bg-pure-white" style={{ fontFamily: 'var(--font-ui)' }}>
      {!hideNav && (
        <Nav
          currentPage={page}
          onNavigate={setPage}
          projectName={activeProject?.name}
        />
      )}

      {page === 'landing' && <Landing onNavigate={setPage} />}

      {page === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}

      {page === 'analyzing' && pendingProject && (
        <AnalyzingScreen
          projectName={pendingProject.name}
          onDone={handleAnalyzingDone}
        />
      )}

      {page === 'breakdown' && pendingProject && (
        <ProjectBreakdown
          project={pendingProject}
          onConfirm={handleBreakdownConfirm}
          onBack={() => setPage('onboarding')}
        />
      )}

      {page === 'board' && activeProject && (
        <PuzzleBoard
          project={activeProject}
          onProjectUpdate={handleProjectUpdate}
          onNavigate={setPage}
        />
      )}

      {page === 'dashboard' && (
        <Dashboard
          projects={projects}
          savedToolIds={savedToolIds}
          onNavigate={setPage}
          onSelectProject={setActiveProjectId}
        />
      )}

      {page === 'community' && (
        <Community
          savedToolIds={savedToolIds}
          onSaveTool={handleSaveTool}
        />
      )}
    </div>
  );
}
