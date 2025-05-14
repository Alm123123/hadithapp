import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Book, BreadcrumbItem, Hadith } from '@/types/api';
import BookCard from '@/components/BookCard';
import HadithCard from '@/components/HadithCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useFavoritesStore } from '@/store/favorites';
import { useSettingsStore } from '@/store/settings';

export default function BookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [children, setChildren] = useState<Book[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { isDarkMode } = useSettingsStore();

  useEffect(() => {
    fetchBook();
    fetchChildren();
    fetchBreadcrumbs();
  }, [id]);

  const fetchBook = async () => {
    try {
      setError(null);
      const response = await fetch(`https://shiahadith.ru/api/items/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Не удалось загрузить данные. Попробуйте позже.');
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await fetch(`https://shiahadith.ru/api/items/${id}/children`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBreadcrumbs = async () => {
    try {
      const response = await fetch(`https://shiahadith.ru/api/path/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBreadcrumbs(data);
    } catch (error) {
      console.error('Error fetching breadcrumbs:', error);
    }
  };

  const toggleFavorite = (hadith: Hadith) => {
    if (isFavorite(hadith.id)) {
      removeFavorite(hadith.id);
    } else {
      addFavorite(hadith);
    }
  };

  // Отладочный вывод для проверки типов дочерних элементов
  useEffect(() => {
    if (children.length > 0) {
      console.log('Children types:', children.map(child => ({
        id: child.id,
        type: child.type,
        desc: child.desc,
      })));
    }
  }, [children]);

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

  if (!book) {
    return (
      <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
        <Text style={[styles.errorText, ...(isDarkMode ? [styles.darkText] : [])]}>Данные не найдены.</Text>
      </View>
    );
  }

  // Разделяем дочерние элементы на подразделы и хадисы
  const hadiths = children.filter(child => child.type === 1000);
  const subSections = children.filter(child => child.type < 1000);
  const isHadithList = hadiths.length > 0 && subSections.length === 0;

  return (
    <View style={[styles.container, ...(isDarkMode ? [styles.darkContainer] : [])]}>
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      {children.length === 0 ? (
        <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
          <Text style={[styles.emptyText, ...(isDarkMode ? [styles.darkText] : [])]}>Содержимое отсутствует.</Text>
        </View>
      ) : (
        <FlatList
          data={children}
          renderItem={({ item }) => {
            if (item.type === 1000) {
              return (
                <HadithCard
                  hadith={item as Hadith}
                  onFavorite={() => toggleFavorite(item as Hadith)}
                  isFavorite={isFavorite(item.id)}
                />
              );
            }
            return <BookCard book={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            isHadithList && book.desc ? (
              <Text style={[styles.headerText, ...(isDarkMode ? [styles.darkText] : [])]}>{book.desc}</Text>
            ) : null
          }
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
});
