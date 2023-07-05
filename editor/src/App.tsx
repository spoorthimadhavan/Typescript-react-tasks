import React, { useState } from 'react';
import Toolbar from './Components/ToolBar';
import Editor from './Components/editor';
import PartList from './Components/partLists';
import { Button } from '@mui/material';
interface Part {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [canvasContent, setCanvasContent] = useState<React.ReactNode>(null);
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddText = () => {
    const newTextElement = <p>New Text Element</p>;
    setCanvasContent((prevContent) => (
      <>
        {prevContent}
        {newTextElement}
      </>
    ));

  };

  const handleAddImage = () => {
    if (isImageAdded) {
      return; // Prevent generating multiple images
    }
    const handleImageClick = () => {
      const Parts: Part[] = [
        { id: 1, name: 'Part1' },
        { id: 2, name: 'Part 2' },
        { id: 3, name: 'Part 3' },
      ];
      const canvasContentWithTextBoxes = (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <input type="text" placeholder="Project Title" />
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Date" />
            </div>
            <div>
              <img src="/logo192.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
          <hr style={{ marginBottom: '10px' }} />
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <input type="text" placeholder="Step Number" />
              <input type="text" placeholder="Step Name" />
            </div>
          </div>
          <img src="/Assembly.jpg" alt="Picture" style={{ width: '300px', height: '200px' }} />
          <PartList Parts={Parts} />
          <hr style={{ marginBottom: '10px' }} />
          {canvasContent}
        </>
      );
      setCanvasContent(canvasContentWithTextBoxes);
    };

    const newImageElement = (
      <img
        src="/Assembly.jpg"
        alt="New Image Element"
        style={{ width: '200px', height: 'auto', cursor: 'pointer' }}
        onClick={handleImageClick}
      />
    );

    setCanvasContent((prevContent) => (
      <>
        {prevContent}
        {newImageElement}
      </>
    ));
    setIsImageAdded(true); // Mark image as added
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Logic to change the content based on the selected page
  };

  return (
    <div>
      <Toolbar
        onAddText={handleAddText}
        onAddImage={handleAddImage}
      />
      <Editor canvas={canvasContent} />
      <div style={{ textAlign: 'right' }}>
        <span>Page:</span>
        <Button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          1
        </Button>
        {' '}
      </div>
    </div>
  );
};

export default App;