import { useState } from 'react';
import { Link as LinkIcon, Copy, Trash2, Edit } from 'lucide-react';
import Button from '../../components/Button/Button';
import LinkModal from '../../components/LinkModal/LinkModal';
import styles from './Links.module.css';

const Links = () => {
  const [links, setLinks] = useState([
    {
      id: 1,
      destinationUrl: 'https://www.travelwiththejoneses...',
      shortUrl: 'https://cuvette.io/Bn41aCOlnxj',
      remarks: 'campaign1',
      clicks: 5,
      status: 'Active',
      date: 'Jan 14, 2025 16:30'
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  const handleDelete = (id) => {
    setLinkToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLinks(links.filter(link => link.id !== linkToDelete));
    setShowDeleteModal(false);
  };

  const handleCreateLink = (formData) => {
    const newLink = {
      id: Date.now(),
      destinationUrl: formData.destinationUrl,
      shortUrl: `https://cuvette.io/${Math.random().toString(36).substr(2, 8)}`,
      remarks: formData.remarks,
      clicks: 0,
      status: 'Active',
      date: new Date().toLocaleString()
    };
    setLinks([newLink, ...links]);
  };

  const handleEditLink = (formData) => {
    setLinks(links.map(link => 
      link.id === editingLink.id 
        ? { 
            ...link, 
            destinationUrl: formData.destinationUrl,
            remarks: formData.remarks
          }
        : link
    ));
    setEditingLink(null);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    // You can add a toast notification here
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search by remarks"
            className={styles.searchInput}
          />
        </div>
        <Button onClick={() => setShowLinkModal(true)}>
          <LinkIcon size={20} />
          Create new
        </Button>
      </div>

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Original Link</th>
              <th>Short Link</th>
              <th>Clicks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {links.map(link => (
              <tr key={link.id}>
                <td>{link.date}</td>
                <td>{link.destinationUrl}</td>
                <td>
                  <div className={styles.shortUrl}>
                    {link.shortUrl}
                    <button 
                      className={styles.copyButton}
                      onClick={() => handleCopy(link.shortUrl)}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </td>
                <td>{link.clicks}</td>
                <td>
                  <span className={`${styles.status} ${styles[link.status.toLowerCase()]}`}>
                    {link.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => {
                        setEditingLink(link);
                        setShowLinkModal(true);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LinkModal
        isOpen={showLinkModal}
        onClose={() => {
          setShowLinkModal(false);
          setEditingLink(null);
        }}
        onSubmit={editingLink ? handleEditLink : handleCreateLink}
        initialData={editingLink}
      />

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Are you sure, you want to remove it?</h3>
            <div className={styles.modalActions}>
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteModal(false)}
              >
                NO
              </Button>
              <Button onClick={confirmDelete}>YES</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;