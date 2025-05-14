import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSettingsStore } from '@/store/settings';
import { Moon, Sun } from 'lucide-react-native';

const FONT_FAMILIES = ['Roboto', 'OpenSans', 'Montserrat', 'Lato', 'PTSans'];
const FONT_SIZES = [14, 16, 18, 20, 22];

export default function SettingsScreen() {
  const { fontFamily, fontSize, isDarkMode, setFontFamily, setFontSize, toggleDarkMode } = useSettingsStore();

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.darkContainer]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { fontFamily, fontSize: fontSize + 2 },
            ...(isDarkMode ? [styles.darkText] : []),
          ]}
        >
          Тема
        </Text>
        <TouchableOpacity
          style={[styles.themeButton, ...(isDarkMode ? [styles.darkThemeButton] : [])]}
          onPress={toggleDarkMode}
          accessibilityLabel={isDarkMode ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
        >
          {isDarkMode ? (
            <Moon size={24} color="#fff" />
          ) : (
            <Sun size={24} color="#000" />
          )}
          <Text
            style={[
              styles.themeText,
              { fontFamily, fontSize },
              ...(isDarkMode ? [styles.darkText] : []),
            ]}
          >
            {isDarkMode ? 'Тёмная тема' : 'Светлая тема'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { fontFamily, fontSize: fontSize + 2 },
            ...(isDarkMode ? [styles.darkText] : []),
          ]}
        >
          Шрифт
        </Text>
        <View style={styles.optionsGrid}>
          {FONT_FAMILIES.map((font) => (
            <TouchableOpacity
              key={font}
              style={[
                styles.option,
                fontFamily === font && styles.selectedOption,
                ...(fontFamily === font && isDarkMode ? [styles.darkSelectedOption] : []),
                ...(isDarkMode ? [styles.darkOption] : []),
              ]}
              onPress={() => setFontFamily(font)}
              accessibilityLabel={`Выбрать шрифт ${font}`}
            >
              <Text
                style={[
                  styles.optionText,
                  { fontFamily: font, fontSize },
                  ...(fontFamily === font ? [styles.selectedOptionText] : []),
                  ...(isDarkMode ? [styles.darkText] : []),
                ]}
              >
                {font}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { fontFamily, fontSize: fontSize + 2 },
            ...(isDarkMode ? [styles.darkText] : []),
          ]}
        >
          Размер шрифта
        </Text>
        <View style={styles.optionsGrid}>
          {FONT_SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.option,
                fontSize === size && styles.selectedOption,
                ...(fontSize === size && isDarkMode ? [styles.darkSelectedOption] : []),
                ...(isDarkMode ? [styles.darkOption] : []),
              ]}
              onPress={() => setFontSize(size)}
              accessibilityLabel={`Установить размер шрифта ${size}px`}
            >
              <Text
                style={[
                  styles.optionText,
                  { fontFamily, fontSize: size },
                  ...(fontSize === size ? [styles.selectedOptionText] : []),
                  ...(isDarkMode ? [styles.darkText] : []),
                ]}
              >
                {size}px
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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
  contentContainer: {
    paddingBottom: 16,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  darkText: {
    color: '#fff',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkOption: {
    backgroundColor: '#2a2a2a', // Тёмный фон кнопок в тёмной теме
  },
  selectedOption: {
    backgroundColor: '#007AFF', // Синий фон для выбранной кнопки в светлой теме
  },
  darkSelectedOption: {
    backgroundColor: '#1a73e8', // Более яркий синий фон для выбранной кнопки в тёмной теме
  },
  optionText: {
    color: '#000', // Цвет текста в светлой теме
  },
  selectedOptionText: {
    color: '#fff', // Цвет текста для выбранной кнопки
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkThemeButton: {
    backgroundColor: '#2a2a2a', // Тёмный фон кнопки темы в тёмной теме
  },
  themeText: {
    fontSize: 16,
    color: '#000', // Цвет текста в светлой теме
  },
});
