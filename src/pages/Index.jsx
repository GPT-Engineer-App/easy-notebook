import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Stack, Text, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Select } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      category,
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    onOpen();
  };

  const handleUpdateNote = () => {
    const updatedNotes = notes.map((note) => (note.id === selectedNote.id ? { ...note, title, content, category } : note));
    setNotes(updatedNotes);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setCategory("");
    onClose();
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box p={4}>
      <Heading mb={4}>Note Taking App</Heading>
      <Flex mb={4}>
        <Input placeholder="Search notes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mr={2} />
        <Button leftIcon={<FaSearch />}>Search</Button>
      </Flex>
      <Stack spacing={4}>
        {filteredNotes.map((note) => (
          <Box key={note.id} p={4} borderWidth={1} borderRadius="md">
            <Flex justify="space-between" align="center">
              <Heading size="md">{note.title}</Heading>
              <Flex>
                <Button size="sm" leftIcon={<FaEdit />} mr={2} onClick={() => handleEditNote(note)}>
                  Edit
                </Button>
                <Button size="sm" leftIcon={<FaTrash />} onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </Button>
              </Flex>
            </Flex>
            <Text mt={2}>{note.content}</Text>
            <Text mt={2} color="gray.500">
              Category: {note.category}
            </Text>
          </Box>
        ))}
      </Stack>
      <Box mt={8}>
        <Heading size="md" mb={2}>
          Add a new note
        </Heading>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={2} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} mb={2} />
        <Select placeholder="Select a category" value={category} onChange={(e) => setCategory(e.target.value)} mb={2}>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
        </Select>
        <Button leftIcon={<FaPlus />} onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={2} />
            <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} mb={2} />
            <Select placeholder="Select a category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateNote}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
