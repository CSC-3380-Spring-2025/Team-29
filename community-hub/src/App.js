import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ShoppingCart, MessageSquare } from "lucide-react";

export default function CommunityHub() {
  const [leaderFilter, setLeaderFilter] = useState("top100");
  const [searchUser, setSearchUser] = useState("");
  const [comment, setComment] = useState("");

  // placeholder data
  const topPoems = [
    { title: "Morning Dew", author: "Alice" },
    { title: "Whispering Winds", author: "Bob" },
    // ... up to top 100
  ];
  const featuredPoems = [
    { title: "Sunset Serenade", snippet: "The sky danced in hues..." },
    { title: "Garden Secrets", snippet: "Petals whisper softly..." },
  ];
  const stats = {
    totalVotes: 128,
    tournamentsWon: 5,
    bestPoem: "Ode to Spring",
  };
  const flowers = [
    { name: "Rose" },
    { name: "Lily" },
    { name: "Daisy" },
    { name: "Tulip" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Leaderboard */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Poem Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search users..."
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
          />
          <Select onValueChange={setLeaderFilter} value={leaderFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter leaderboard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top100">Top 100</SelectItem>
              <SelectItem value="friends">Friends</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button onClick={() => {/* fetch leaderboard */}}>View Leaderboard</Button>
            <Button variant="outline" onClick={() => {/* switch to poems */}}>Switch to Poems</Button>
          </div>
          <ul className="divide-y">
            {topPoems.map((p, i) => (
              <li key={i} className="py-2 flex justify-between items-center">
                <span>{i + 1}. {p.title}</span>
                <span className="font-semibold">{p.author}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Community Chat */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <MessageSquare className="mr-2" />Garden Talk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {featuredPoems.map((poem, i) => (
              <Card key={i} className="p-4">
                <h3 className="font-medium">{poem.title}</h3>
                <p className="text-sm text-muted-foreground">{poem.snippet}</p>
                <div className="flex space-x-2 mt-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                  <Button onClick={() => {/* post comment */}}>Create Comment</Button>
                  <Button variant="outline" onClick={() => setComment("")}>Cancel</Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => {/* create group */}}>Create Group</Button>
            <Button variant="outline" onClick={() => {/* add to group */}}>Add to Group</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats & Flower Shop */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <ShoppingCart className="mr-2" />My Stats & Flower Shop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p>Total Votes: <span className="font-semibold">{stats.totalVotes}</span></p>
            <p>Tournaments Won: <span className="font-semibold">{stats.tournamentsWon}</span></p>
            <p>My Best Poem: <span className="italic">{stats.bestPoem}</span></p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => {/* view stats */}}>View Stats</Button>
            <Button onClick={() => {/* open store */}}>Open Store</Button>
            <Button variant="outline">View All Poems</Button>
            <Button variant="secondary" onClick={() => {/* copy to clipboard */}}>Copy to Clipboard</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {flowers.map((flower, i) => (
              <Card key={i} className="p-4 text-center">
                <p className="mb-2">{flower.name}</p>
                <Button size="sm" onClick={() => {/* buy flower */}}>
                  <Copy className="mr-1" />Buy
                </Button>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

