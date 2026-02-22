/**
 * data.js — Portfolio Content Data
 * Edit this file to update your skills and projects.
 */

const SKILLS = [
  { icon: '🟨', name: 'JavaScript', level: 88 },
  { icon: '🟢', name: 'Node.js',    level: 85 },
  { icon: '🍃', name: 'MongoDB',    level: 82 },
  { icon: '🚂', name: 'Express.js', level: 85 },
  { icon: '🌐', name: 'HTML / CSS', level: 92 },
  { icon: '📄', name: 'EJS',        level: 80 },
  { icon: '✨', name: 'React',      level: 70 },
  { icon: '🗄️', name: 'REST APIs',  level: 84 },
  { icon: '🐙', name: 'Git / GitHub', level: 80 },
  { icon: '🗺️', name: 'Mapbox',    level: 72 },
  { icon: '🔐', name: 'Auth / JWT', level: 78 },
  { icon: '📱', name: 'Responsive', level: 88 },
];

const PROJECTS = [
  {
    num:   '01',
    tag:   'Productivity',
    title: 'TaskFlow',
    desc:  'A full-featured task management app with custom categories, reward system, templates, graphs, and daily/weekly analytics. Built with Node.js, EJS, and MongoDB.',
    tech:  ['Node.js', 'MongoDB', 'EJS', 'Express'],
    link:  '#',
  },
  {
    num:   '02',
    tag:   'Real Estate',
    title: 'House Hub',
    desc:  'A real estate listing platform featuring Mapbox integration, user auth, listing management, and an interactive map-based search. RESTful MVC architecture.',
    tech:  ['Node.js', 'Express', 'Mapbox GL', 'MongoDB'],
    link:  '#',
  },
  {
    num:   '03',
    tag:   'Full Stack',
    title: 'Dev Project',
    desc:  'A showcase of full-stack capabilities — JWT authentication, MVC pattern, RESTful API design, and modern responsive frontend powered by vanilla JS.',
    tech:  ['JavaScript', 'Node.js', 'REST API', 'CSS'],
    link:  '#',
  },
];
