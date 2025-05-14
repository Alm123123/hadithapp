import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Book } from '@/types/api';
import BookCard from '@/components/BookCard';
import { useSettingsStore } from '@/store/settings';

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useSettingsStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setError(null);
      const response = await fetch('https://shiahadith.ru/api/books');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Не удалось загрузить книги. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#007AFF'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
        <Text style={[styles.errorText, ...(isDarkMode ? [styles.darkText] : [])]}>{error}</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
        <Text style={[styles.emptyText, ...(isDarkMode ? [styles.darkText] : [])]}>Книги не найдены.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, ...(isDarkMode ? [styles.darkContainer] : [])]}>
      <FlatList
        data={books}
        renderItem={({ item }) => <BookCard book={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingVertical: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  darkText: {
    color: '#fff',
  },
});
