package com.hackzurich.liftmeup

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kotlin.random.Random

class GoToElevatorActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_go_to_elevator)

        findViewById<TextView>(R.id.elevator_nb).apply{
            val list = listOf('A', 'B', 'C', 'D', 'E')
            val randomElement = list.random()
            text = "" + randomElement;
        }

        Handler().postDelayed({
            val intent = Intent(this, MixerActivity::class.java)
            startActivity(intent)
        }, Random.nextLong(2500,4500))
    }
}