import React, { useEffect, useState } from 'react';
import { addTag } from '~/redux/features/ingredients';
import { useAppDispatch, useAppSelector } from '~/redux/store';

interface Props {
    bahan?: any
}

const MultiInput:React.FC<Props> = (props) => {
    const tag = useAppSelector(state => state.tags)
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch()
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
        e.preventDefault();
        if (!tags.includes(inputValue.trim())) {
            const updateChange = [...tags, inputValue.trim()]
            console.log(updateChange)
            setTags(updateChange);
            dispatch(addTag(updateChange));
        }
        setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove:string) => {
        const deleteTags = tags.filter(tag => tag !== tagToRemove)
        setTags(deleteTags);
        dispatch(addTag(deleteTags));
    };

    useEffect(() => {
      setTags(tag.value)
    }, [tag])

    return (
        <div style={styles.container}>
        {tags.map((tag, index) => (
            <div key={index} style={styles.tag}>
            {tag}
            <span style={styles.remove} onClick={() => handleRemoveTag(tag)}>×</span>
            </div>
        ))}
        <input
            type="text"
            placeholder="Enter text here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
        />
        </div>
    );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '4px',
    maxWidth: '100%',
  },
  tag: {
    backgroundColor: '#FBBF8B',
    borderRadius: '16px',
    padding: '4px 8px',
    margin: '2px',
    display: 'flex',
    alignItems: 'center'
  },
  remove: {
    marginLeft: '8px',
    cursor: 'pointer',
    color: '#777',
    fontWeight: 'bold'
    
  },
  input: {
    border: 'none',
    outline: 'none',
    flex: 1,
    minWidth: '120px',
    margin: '4px'
  }
};

export default MultiInput;
