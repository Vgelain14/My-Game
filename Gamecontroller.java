import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GameController {
    private List<QuizQuestion> quizQuestions;

    public GameController() {
        quizQuestions = new ArrayList<>();
        quizQuestions.add(new QuizQuestion(
                "What is the purpose of the Critical Path Method (CPM)?",
                new String[]{"Allocate resources", "Identify key tasks", "Find project bottlenecks", "Determine task dependencies"},
                1 // Correct answer index
        ));
        quizQuestions.add(new QuizQuestion(
                "Which document defines how project information will be communicated to stakeholders?",
                new String[]{"Communication management plan", "Risk register", "Quality management plan", "Resource breakdown structure"},
                0
        ));
        quizQuestions.add(new QuizQuestion(
                "What is the main purpose of a sprint retrospective in Agile?",
                new String[]{"Evaluate the product", "Improve the process", "Assign new tasks", "Review the backlog"},
                1
        ));
        quizQuestions.add(new QuizQuestion(
                "What is a stakeholder's primary role?",
                new String[]{"Approved deliverables", "Influence project outcomes", "Manage team resources", "Define the project plan"},
                1
        ));
        quizQuestions.add(new QuizQuestion(
                "What is a key principle of Lean project management?",
                new String[]{"Focus on customer value", "Maximize resource usage", "Implement frequent changes", "Use a strict timeline"},
                0
        ));
    }

    @GetMapping("/questions")
    public List<QuizQuestion> getQuizQuestions() {
        return quizQuestions;
    }

    @PostMapping("/submit-answer")
    public String submitAnswer(@RequestParam int questionIndex, @RequestParam int answerIndex) {
        QuizQuestion question = quizQuestions.get(questionIndex);
        if (answerIndex == question.getCorrectAnswerIndex()) {
            return "Correct!";
        } else {
            return "Incorrect!";
        }
    }
}

class QuizQuestion {
    private String question;
    private String[] options;
    private int correctAnswerIndex;

    public QuizQuestion(String question, String[] options, int correctAnswerIndex) {
        this.question = question;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }

    public String getQuestion() {
        return question;
    }

    public String[] getOptions() {
        return options;
    }

    public int getCorrectAnswerIndex() {
        return correctAnswerIndex;
    }
}
