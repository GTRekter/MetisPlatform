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
        static ConsoleColor defaultColor;

        static void Main(string[] args)
        {
            Console.WriteLine("Setting console...");
            Console.OutputEncoding = Encoding.UTF8;
            defaultColor = Console.ForegroundColor;
            
            Console.WriteLine("Generating flashcards...");
            List<Word> words = ReadLessonsFiles();
            PrintWords(words, defaultColor);

            Console.WriteLine("Press any key to start.");
            Console.ReadLine();

            MemorizeWords(words);
            
            // Keep the console window open in debug mode.
            Console.ForegroundColor = defaultColor;
            Console.WriteLine("Press any key to exit.");
            Console.ReadLine();
        }
        private static void MemorizeWords(List<Word> words)
        {
            Console.WriteLine("Shuffling...");
            words = ShuffleWords(words);
            Console.Clear();

            List<Word> errors = new List<Word>();
            for(int index = 0; index < words.Count; index++)
            {
                var currentWord = words[index];
                PrintScore(words.Count, errors.Count, index, defaultColor);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.Write($"{FirstLetterCapital(currentWord.English)}");
                Console.ReadLine();
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write($"{currentWord.Korean}");
                Console.ForegroundColor = defaultColor;
                Console.Write($" ({currentWord.Roman})");
                if(Console.ReadKey().Key == ConsoleKey.DownArrow)
                {
                    errors.Add(currentWord);
                }
                Console.Clear();    
            }
            if(errors.Count == 0)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("You are a master!");
            }
            else
            {
                Console.WriteLine("You have errors!");
                MemorizeWords(errors);
            }       
        }
        private static List<Word> ShuffleWords(List<Word> words)
        {
            Random random = new Random();
            return words.OrderBy(x => random.Next()).ToList();
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
        private static void PrintScore(int wordsCount, int errors, int index, ConsoleColor defaultColor)
        {
            Console.ForegroundColor = defaultColor;
            Console.Write($"{wordsCount} | ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write($"{errors} | ");
            Console.ForegroundColor = defaultColor;
            Console.WriteLine($"{wordsCount-index} words remaining");
            Console.ForegroundColor = defaultColor;
            Console.WriteLine();
        }
        private static string FirstLetterCapital(string str)
        {
            return Char.ToUpper(str[0]) + str.Remove(0, 1);            
        }
    }
}