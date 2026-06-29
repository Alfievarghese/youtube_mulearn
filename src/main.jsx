import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Avatar, Button, Chip, CssBaseline, IconButton, InputAdornment, TextField, ThemeProvider, createTheme } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff3b30' },
    secondary: { main: '#c9ff5a' },
    background: { default: '#070707', paper: '#121212' },
  },
  typography: {
    fontFamily: '"Inter Tight", "Space Grotesk", Arial, sans-serif',
  },
  shape: { borderRadius: 8 },
});

const topics = ['New drops', 'Longform', 'Design', 'Code', 'Music', 'Editing'];

const videos = [
  {
    id: 1,
    title: 'Kerala night build: React clone task',
    channel: 'Mulearn Lab',
    views: '42K views',
    age: '2 hours ago',
    length: '18:42',
    topic: 'Code',
    accent: '#ff3b30',
    secondary: '#c9ff5a',
    pattern: 'grid',
  },
  {
    id: 2,
    title: 'How editors cut a hook in the first 6 seconds',
    channel: 'Frame Theory',
    views: '91K views',
    age: '1 day ago',
    length: '11:05',
    topic: 'Editing',
    accent: '#7c91a6',
    secondary: '#f4eee4',
    pattern: 'slash',
  },
  {
    id: 3,
    title: 'Designing thumbnails that do not scream template',
    channel: 'Pixel Court',
    views: '18K views',
    age: '4 days ago',
    length: '09:17',
    topic: 'Design',
    accent: '#c9ff5a',
    secondary: '#ff3b30',
    pattern: 'rings',
  },
  {
    id: 4,
    title: 'Playlist architecture for deep focus coding',
    channel: 'Low Light Radio',
    views: '63K views',
    age: '6 days ago',
    length: '53:20',
    topic: 'Music',
    accent: '#a69df2',
    secondary: '#7c91a6',
    pattern: 'waves',
  },
  {
    id: 5,
    title: 'Building a watch page without copying YouTube pixel for pixel',
    channel: 'Frontend Field',
    views: '27K views',
    age: '1 week ago',
    length: '24:11',
    topic: 'Code',
    accent: '#f4eee4',
    secondary: '#ff3b30',
    pattern: 'blocks',
  },
  {
    id: 6,
    title: 'Micro-documentary: a creator desk at midnight',
    channel: 'Signal Feed',
    views: '102K views',
    age: '2 weeks ago',
    length: '14:38',
    topic: 'Longform',
    accent: '#ff9f1c',
    secondary: '#c9ff5a',
    pattern: 'sun',
  },
];

const navItems = [
  ['Signal Feed', HomeRoundedIcon],
  ['Creator Desk', ExploreRoundedIcon],
  ['Subscriptions', SubscriptionsRoundedIcon],
  ['Watch Later', WatchLaterRoundedIcon],
  ['Library', VideoLibraryRoundedIcon],
  ['Live Rooms', WhatshotRoundedIcon],
];

function Thumbnail({ video, large = false }) {
  return (
    <div
      className={`thumbnail ${large ? 'thumbnailLarge' : ''} pattern-${video.pattern}`}
      style={{ '--accent': video.accent, '--second': video.secondary }}
    >
      <div className="thumbNoise" />
      <div className="thumbMark">MT</div>
      <div className="thumbTitle">{video.topic}</div>
      <div className="playDisc">
        <PlayArrowRoundedIcon fontSize={large ? 'large' : 'small'} />
      </div>
      <span className="duration">{video.length}</span>
    </div>
  );
}

function App() {
  const [activeTopic, setActiveTopic] = useState('New drops');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(1);

  const selectedVideo = videos.find((video) => video.id === selectedId) ?? videos[0];

  const normalized = query.trim().toLowerCase();
  const visibleVideos = videos.filter((video) => {
    const matchesTopic = activeTopic === 'New drops' || video.topic === activeTopic;
    const matchesQuery =
      !normalized ||
      [video.title, video.channel, video.topic].some((value) =>
        value.toLowerCase().includes(normalized),
      );
    return matchesTopic && matchesQuery;
  });

  const queue = videos.filter((video) => video.id !== selectedVideo.id).slice(0, 4);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="appShell">
        <aside className="sidebar">
          <div className="brand">
            <span className="brandGlyph">m</span>
            <span>MuleTube</span>
          </div>
          <nav className="navList" aria-label="Primary">
            {navItems.map(([label, Icon], index) => (
              <button className={index === 0 ? 'navItem active' : 'navItem'} key={label}>
                <Icon fontSize="small" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="studioCard">
            <span className="studioLabel">React clone task</span>
            <strong>200 karma proof, but with a real visual point of view.</strong>
            <Button size="small" startIcon={<AddRoundedIcon />} variant="contained">
              New Cut
            </Button>
          </div>
        </aside>

        <section className="content">
          <header className="topbar">
            <div>
              <p className="dateLine">Creator console</p>
              <h1>Signal Feed</h1>
            </div>
            <TextField
              className="searchField"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search field notes, creators, cuts"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="topActions">
              <IconButton aria-label="Tune feed">
                <TuneRoundedIcon />
              </IconButton>
              <IconButton aria-label="Notifications">
                <NotificationsRoundedIcon />
              </IconButton>
              <Avatar className="profileAvatar">A</Avatar>
            </div>
          </header>

          <div className="topicRail">
            {topics.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                onClick={() => setActiveTopic(topic)}
                className={activeTopic === topic ? 'topicChip selected' : 'topicChip'}
              />
            ))}
          </div>

          <section className="featureGrid">
            <article className="heroPlayer">
              <Thumbnail video={selectedVideo} large />
              <div className="heroCopy">
                <div>
                  <span className="signalTag">Now Playing</span>
                  <h2>{selectedVideo.title}</h2>
                  <p>
                    {selectedVideo.channel} · {selectedVideo.views} · {selectedVideo.age}
                  </p>
                </div>
                <Button variant="contained" startIcon={<PlayArrowRoundedIcon />}>
                  Play
                </Button>
              </div>
            </article>

            <aside className="queuePanel">
              <div className="panelHeader">
                <h3>Watch Later</h3>
                <IconButton aria-label="More queue options" size="small">
                  <MoreHorizRoundedIcon />
                </IconButton>
              </div>
              {queue.map((video, index) => (
                <button className="queueItem" key={video.id} onClick={() => setSelectedId(video.id)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{video.title}</strong>
                    <small>{video.channel}</small>
                  </div>
                </button>
              ))}
            </aside>
          </section>

          <section className="videoSection">
            <div className="sectionTitle">
              <h2>{activeTopic === 'New drops' ? 'New drops' : activeTopic}</h2>
              <p>{visibleVideos.length} cuts tuned for the selected feed</p>
            </div>
            <div className="videoGrid">
              {visibleVideos.map((video) => (
                <article
                  className={video.id === selectedVideo.id ? 'videoCard selected' : 'videoCard'}
                  key={video.id}
                  onClick={() => setSelectedId(video.id)}
                >
                  <Thumbnail video={video} />
                  <div className="videoMeta">
                    <Avatar sx={{ bgcolor: video.accent, color: '#070707' }}>
                      {video.channel.charAt(0)}
                    </Avatar>
                    <div>
                      <h3>{video.title}</h3>
                      <p>{video.channel}</p>
                      <span>
                        {video.views} · {video.age}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
