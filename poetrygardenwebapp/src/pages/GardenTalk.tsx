import React, { useEffect, useState } from 'react';

import { collection, doc, getDocs, updateDoc, addDoc, onSnapshot, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';  
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FaHeart } from 'react-icons/fa';



interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: any;
  likes: string[];
}

interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: any;
}

const RepliesList: React.FC<{ postId: string }> = ({ postId }) => {
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts', postId, 'replies'), (snapshot) => {
      const r: Reply[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Reply;
        r.push({ id: doc.id, ...data });
      });
      setReplies(r);
    });
    return () => unsub();
  }, [postId]);

  return (
    <>
      {replies.map((r) => (
        <div key={r.id} className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">{r.author}:</span> {r.content}
        </div>
      ))}
    </>
  );
};

const GardenTalk: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [newPoem, setNewPoem] = useState('');
  const userId = useSelector((state: RootState) => state.auth.user?.uid || 'guest');
  const userName = useSelector((state: RootState) => state.auth.user?.displayName || 'Anonymous');

  // Load posts and subscribe to changes
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postData: Post[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        postData.push({
          id: docSnap.id,
          content: data.content,
          author: data.author,
          timestamp: data.timestamp,
          likes: data.likes || [],
        });
      });
      setPosts(postData);
    });
    return () => unsub();
  }, []);

  const handleReplyChange = (postId: string, value: string) => {
    setReplyInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleReplySubmit = async (postId: string) => {
    const reply = replyInputs[postId];
    if (!reply.trim()) return;

    const replyRef = collection(db, 'posts', postId, 'replies');
    await addDoc(replyRef, {
      content: reply,
      author: userName,
      timestamp: serverTimestamp(),
    });
    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleLikeToggle = async (postId: string, hasLiked: boolean) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
    });
  };

  const handleSubmitPoem = async () => {
    if (!newPoem.trim()) return;
    await addDoc(collection(db, 'posts'), {
      content: newPoem,
      author: userName,
      timestamp: serverTimestamp(),
      likes: [],
    });
    setNewPoem('');
  };

  // Sort posts safely
  const sortedPosts = posts.sort((a, b) => {
    const aTime = a.timestamp?.seconds || 0;
    const bTime = b.timestamp?.seconds || 0;
    return bTime - aTime;
  });

  return (
  <div className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-extrabold mb-8 text-green-700 flex items-center gap-2">
      🌱 Garden Talk
    </h1>

    {/* New Poem Input */}
    <div className="mb-8">
      <textarea
        className="w-full border border-green-300 rounded-lg p-3 text-gray-900 placeholder-green-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        placeholder="Write a new poem..."
        value={newPoem}
        rows={4}
        onChange={(e) => setNewPoem(e.target.value)}
      />
      <button
        onClick={handleSubmitPoem}
        className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
        disabled={!newPoem.trim()}
      >
        Submit Poem
      </button>
    </div>

    {/* Posts List */}
    {sortedPosts.map((post) => {
      const hasLiked = post.likes.includes(userId);

      return (
        <div
          key={post.id}
          className="border border-green-200 rounded-xl p-6 mb-8 bg-white shadow hover:shadow-lg transition"
        >
          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
          <p className="text-sm text-green-600 mt-3 font-medium">– {post.author}</p>

          {/* Like Button */}
          <div className="flex items-center mt-5 space-x-4">
            <button
              className="flex items-center text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
              onClick={() => handleLikeToggle(post.id, hasLiked)}
              aria-label={hasLiked ? "Unlike post" : "Like post"}
              title={hasLiked ? "Unlike post" : "Like post"}
            >
              <FaHeart
                color={hasLiked ? '#ef4444' : '#9ca3af'} // Tailwind red-500 and gray-400 hex
                size={20}
              />
            </button>
            <span className="text-gray-700 font-medium">{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
            {/* Optional replies count here */}
          </div>

          {/* Replies */}
          <div className="mt-6 pl-5 border-l-2 border-green-200">
            <RepliesList postId={post.id} />

            {/* Reply Input */}
            <textarea
              className="w-full border border-green-300 rounded-md p-2 mt-3 text-gray-900 placeholder-green-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              rows={2}
              placeholder="Write a reply..."
              value={replyInputs[post.id] || ''}
              onChange={(e) => handleReplyChange(post.id, e.target.value)}
            />
            <button
              onClick={() => handleReplySubmit(post.id)}
              className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!replyInputs[post.id]?.trim()}
            >
              Reply
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

}
export default GardenTalk;