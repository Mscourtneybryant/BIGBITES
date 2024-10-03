import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Homepage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token) {
      fetchEmployees();
      fetchEvents();
      updateGreeting();
      fetchPosts();
      const intervalId = setInterval(updateGreeting, 60000);
      return () => clearInterval(intervalId);
    } else {
      navigate('/login');
    }
  }, [token, dispatch, navigate]);

  const updateGreeting = () => {
    const currentHour = new Date().getHours();
    let greetingMessage = '';
    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = 'Good afternoon';
    } else {
      greetingMessage = 'Good evening';
    }
    setGreeting(`${greetingMessage}, ${user?.name || 'User'}!`);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
      if (err.response && err.response.status === 403) {
        setError('Access forbidden. Please check your permissions.');
      } else {
        setError('Failed to fetch employees. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEvents(response.data.map(event => ({
        ...event,
        date: new Date(event.date)
      })));
    } catch (err) {
      console.error('Error fetching events:', err);
      if (err.response && err.response.status === 403) {
        setError('Access forbidden. Please check your permissions.');
      } else {
        setError('Failed to fetch events. Please try again.');
      }
    }
  };

  const fetchPosts = async () => {
    // This is a mock function. In a real application, you would fetch posts from your backend.
    setPosts([
      { id: 1, author: 'John Doe', content: 'Just completed the new project ahead of schedule!' },
      { id: 2, author: 'Jane Smith', content: 'Looking for volunteers for the charity event next month.' },
    ]);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), author: user?.name || 'Anonymous', content: newPost }]);
      setNewPost('');
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find(e => e.date.toDateString() === date.toDateString());
      return event ? <p className="text-xs text-blue-500">{event.title}</p> : null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold">Employee Management System</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-4">{greeting}</span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Company Calendar</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <Calendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
              />
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Social Feed</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleNewPost} className="mb-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                  placeholder="Share an update..."
                ></textarea>
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Post</button>
              </form>
              {posts.map((post) => (
                <div key={post.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{post.author}</p>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Employee List</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {employees.length > 0 ? (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {employees.map((employee) => (
                  <li key={employee.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                    <div className="w-full flex items-center justify-between p-6 space-x-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-gray-900 text-sm font-medium truncate">{employee.firstName} {employee.lastName}</h3>
                        </div>
                        <p className="mt-1 text-gray-500 text-sm truncate">{employee.email}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No employees found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;