import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Hadith } from '@/types/api';
import HadithCard from '@/components/HadithCard';
import { useFavoritesStore } from '@/store/favorites';
import { useSettingsStore } from '@/store/settings';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { isDarkMode } = useSettingsStore();

  useEffect(() => {
    if (query.trim().length > 0) {
      fetchSearchResults();
    } else {
      setResults([]);
      setError(null);
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://shiahadith.ru/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Не удалось выполнить поиск. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (hadith: Hadith) => {
    if (isFavorite(hadith.id)) {
      removeFavorite(hadith.id);
    } else {
      addFavorite(hadith);
    }
  };

  return (
    <View style={[styles.container, ...(isDarkMode ? [styles.darkContainer] : [])]}>
      <TextInput
        style={[styles.searchInput, ...(isDarkMode ? [styles.darkSearchInput] : [])]}
        placeholder="Введите запрос для поиска..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
      />
      {loading ? (
        <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
          <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#007AFF'} />
        </View>
      ) : error ? (
        <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
          <Text style={[styles.errorText, ...(isDarkMode ? [styles.darkText] : [])]}>{error}</Text>
        </View>
      ) : results.length === 0 && query.trim().length > 0 ? (
        <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
          <Text style={[styles.emptyText, ...(isDarkMode ? [styles.darkText] : [])]}>Ничего не найдено.</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <HadithCard
              hadith={item}
              onFavorite={() => toggleFavorite(item)}
              isFavorite={isFavorite(item.id)}
              highlightQuery={query}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
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
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#000', // Цвет текста в светлой теме
  },
  darkSearchInput: {
    backgroundColor: '#2a2a2a', // Тёмный фон поля ввода в тёмной теме
    borderColor: '#444', // Цвет границы в тёмной теме
    color: '#fff', // Цвет текста в тёмной теме
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
