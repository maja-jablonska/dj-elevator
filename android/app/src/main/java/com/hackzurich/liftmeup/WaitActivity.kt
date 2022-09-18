package com.hackzurich.liftmeup

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler

class WaitActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_wait)

        Handler().postDelayed({
            goToElevator()
        }, 1500)
    }

    private fun goToElevator() {
        val intent: Intent = Intent(this, GoToElevatorActivity::class.java)
        startActivity(intent)
    }
}