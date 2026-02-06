import java.util.Scanner;

public class Main {
  
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== Diagonal Difference Calculator ===");

        System.out.print("Enter the size of the square matrix (n): ");
        int n = sc.nextInt();
        int[][] arr = new int[n][n];
        System.out.println("Enter the elements of the matrix:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                arr[i][j] = sc.nextInt();
            }
        }
        int primarySum = 0;
        int secondarySum = 0;

        for (int i = 0; i < n; i++) {
            primarySum += arr[i][i];
            secondarySum += arr[i][n - 1 - i];
        }

        System.out.println("\nPrimary Diagonal Sum: " + primarySum);
        System.out.println("Secondary Diagonal Sum: " + secondarySum);
        int difference = Math.abs(primarySum - secondarySum);
        System.out.println("Absolute Diagonal Difference: " + difference);
        sc.close();
    }
}
