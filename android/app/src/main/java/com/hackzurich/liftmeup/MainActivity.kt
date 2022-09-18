package com.hackzurich.liftmeup

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView

class MainActivity : AppCompatActivity() {

    var isNewsChecked: Boolean = true
    var isDJChecked: Boolean = true
    var isGeoChecked: Boolean = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        isNewsChecked = intent.getBooleanExtra("isNewsChecked", true)
        isDJChecked = intent.getBooleanExtra("isDJChecked", true)
        isGeoChecked = intent.getBooleanExtra("isGeoChecked", true)

        val textView = findViewById<TextView>(R.id.your_preferences_list).apply {
            text = if (!isNewsChecked && !isDJChecked && !isGeoChecked) "No preferences selected"
            else "" + (if (isNewsChecked) " - Read news\n" else "") + (if (isDJChecked) " - Become an Elevator Music DJ \n" else "")+ (if (isGeoChecked) " - Play GeoGuesser\n" else "")
        }

        val startButton: Button = findViewById(R.id.button_start)
        startButton.setOnClickListener{
            val waitIntent = Intent(this, WaitActivity::class.java)
            startActivity(waitIntent)
        }
    }

    fun sendMessage(view: View) {
        val intent = Intent(this, SettingsActivity::class.java).apply {
            putExtra("isNewsChecked", isNewsChecked)
            putExtra("isDJChecked", isDJChecked)
            putExtra("isGeoChecked", isGeoChecked)
        }
        startActivity(intent)
    }
}