using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace Flashcards
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            var defaultColor = Console.ForegroundColor;
            
            Console.WriteLine("Generating flashcards...");
            List<Word> words = ReadLessonsFiles();
            PrintWords(words, defaultColor);

            Console.WriteLine("Press any key to start.");
            Console.ReadLine();
            Console.Clear();
            StartMemorize(words, defaultColor);

            // Keep the console window open in debug mode.
            Console.WriteLine("Press any key to exit.");
            Console.ReadLine();
        }

        private static List<Word> ReadLessonsFiles()
        {
            List<Word> words = new List<Word>();
            foreach (string file in Directory.EnumerateFiles(".\\files", "*.json")) {
                string jsonString = File.ReadAllText(file);
                Lesson lesson = JsonSerializer.Deserialize<Lesson>(jsonString);
                words.AddRange(lesson.Words);
            }
            return words;
        }
        private static void PrintWords(List<Word> words, ConsoleColor defaultColor)
        {
            foreach (Word word in words)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.Write($"{FirstLetterCapital(word.English).PadLeft(35)}");
                Console.Write("       ");
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write($"{word.Korean}");
                Console.ForegroundColor = defaultColor;
                Console.WriteLine($" ({word.Roman})");
            }
        }
        private static void StartMemorize(List<Word> words, ConsoleColor defaultColor)
        {
            Random r = new Random();
            foreach (Word word in words.OrderBy(x => r.Next()))
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.Write($"{FirstLetterCapital(word.English)}");
                Console.ReadLine();
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write($"{word.Korean}");
                Console.ForegroundColor = defaultColor;
                Console.Write($" ({word.Roman})");
                Console.ReadLine();
                Console.Clear();
            }
        }
        private static string FirstLetterCapital(string str)
        {
            return Char.ToUpper(str[0]) + str.Remove(0, 1);            
        }
    }
}