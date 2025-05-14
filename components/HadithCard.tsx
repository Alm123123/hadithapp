import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import { Hadith } from '@/types/api';
import { Copy, Share2, Heart } from 'lucide-react-native';
import { useSettingsStore } from '@/store/settings';

interface HadithCardProps {
  hadith: Hadith;
  onFavorite: () => void;
  isFavorite: boolean;
  highlightQuery?: string;
}

export default function HadithCard({
  hadith,
  onFavorite,
  isFavorite,
  highlightQuery,
}: HadithCardProps) {
  const { fontFamily, fontSize, theme } = useSettingsStore();

  const handleCopy = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(hadith.desc);
    }
  };

  const handleShare = async () => {
    if (Platform.OS === 'web') {
      if (navigator.share) {
        await navigator.share({
          text: hadith.desc,
        });
      }
    } else {
      await Share.share({
        message: hadith.desc,
      });
    }
  };

  const renderHighlightedText = (text: string, query: string) => {
    if (!query || query.trim().length === 0) {
      return (
        <Text style={[styles.text, { fontFamily, fontSize, color: theme.text }]}>
          {text}
        </Text>
      );
    }

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
      <Text style={[styles.text, { fontFamily, fontSize, color: theme.text }]}>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <Text
              key={index}
              style={[
                styles.highlightedText,
                { backgroundColor: theme.primary + '20' },
              ]}
            >
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: theme.border,
        },
      ]}
    >
      {renderHighlightedText(hadith.desc, highlightQuery || '')}
      <View style={[styles.actions, { borderTopColor: theme.border }]}>
        <TouchableOpacity
          onPress={handleCopy}
          style={styles.button}
          accessibilityLabel="Copy hadith text"
        >
          <Copy size={20} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          style={styles.button}
          accessibilityLabel="Share hadith"
        >
          <Share2 size={20} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFavorite}
          style={styles.button}
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={20}
            color={isFavorite ? theme.primary : theme.textSecondary}
            fill={isFavorite ? theme.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    elevation: 3,
  },
  text: {
    marginBottom: 16,
    lineHeight: 24,
  },
  highlightedText: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 16,
  },
  button: {
    padding: 8,
  },
});